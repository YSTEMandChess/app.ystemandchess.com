import { SocketService } from '../../services/socket/socket.service';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  SecurityContext,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  AgoraClient,
  ClientEvent,
  NgxAgoraService,
  Stream,
  StreamEvent,
} from 'ngx-agora';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

//import * as JitsiMeetExternalAPI from "../../../../src/assets/external_api.js";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  private localStream: Stream;
  private localScreenStream: Stream;
  private remoteStream: Stream;
  private client: AgoraClient;
  private screenClient: AgoraClient;
  private clientUID;
  private messageQueue = new Array();
  private isReady: boolean;
  public chessSrc;

  constructor(
    private cookie: CookieService,
    private socket: SocketService,
    private agoraService: NgxAgoraService,
    private sanitization: DomSanitizer
  ) {
    this.chessSrc = sanitization.bypassSecurityTrustResourceUrl(
      environment.urls.chessClientURL
    );
  }

  ngOnInit() {
    let userContent;

    if (this.cookie.check('login')) {
      userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
      this.httpGetAsync(
        `${environment.urls.middlewareURL}/meetings/inMeeting`,
        'GET',
        (response) => {
          if (
            JSON.parse(response) ===
            'There are no current meetings with this user.'
          ) {
            return;
          }
          let responseText = JSON.parse(response)[0];
          //display web cam styling
          document.getElementById('local_stream').style.display = 'block';
          document.getElementById('remote_stream').style.display = 'block';

          // Code for webcam
          // -------------------------------------------------------------------------
          this.client = this.agoraService.createClient({
            mode: 'rtc',
            codec: 'h264',
          });
          this.client.init(
            environment.agora.appId,
            () => console.log('init successful'),
            () => console.log('init unsuccessful')
          );
          this.client.join(
            null,
            responseText.meetingId,
            userContent?.role === 'mentor' ? '123' : '456',
            (uid) => {
              this.clientUID = uid;
              this.localStream = this.agoraService.createStream({
                streamID: this.clientUID,
                audio: true,
                video: true,
                screen: false,
              });
              this.localStream.init(
                () => {
                  this.localStream.play('local_stream');
                  this.client.publish(this.localStream, function (err) {
                    console.log('Publish local stream error: ' + err);
                  });
                  this.client.on(ClientEvent.LocalStreamPublished, (evt) =>
                    console.log('Publish local stream successfully', evt)
                  );
                },
                (err) => console.log('getUserMedia failed', err)
              );
            }
          );

          if (userContent.role === 'mentor') {
            this.screenClient = this.agoraService.createClient({
              mode: 'rtc',
              codec: 'h264',
            });
            this.screenClient.init(
              environment.agora.appId,
              () => console.log('init successful'),
              () => console.log('init unsuccessful')
            );
            this.screenClient.join(
              null,
              responseText.meetingId,
              '789',
              (uid) => {
                this.localScreenStream = this.agoraService.createStream({
                  streamID: uid,
                  audio: false,
                  video: false,
                  screen: true,
                  mediaSource: 'window',
                });
                this.localScreenStream.init(
                  () => {
                    this.screenClient.publish(
                      this.localScreenStream,
                      function (err) {
                        console.log('Publish local stream error: ' + err);
                      }
                    );
                    this.screenClient.on(
                      ClientEvent.LocalStreamPublished,
                      (evt) =>
                        console.log('Publish local stream successfully', evt)
                    );
                  },
                  (err) => console.log('getUserMedia failed', err)
                );
              }
            );
          }

          this.agoraService.client.on(ClientEvent.Error, (err) => {
            console.log('Got error msg:', err.reason);
            if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
              this.agoraService.client.renewChannelKey(
                '',
                () => {
                  console.log('Renew channel key successfully');
                },
                (err) => {
                  console.log('Renew channel key failed: ', err);
                }
              );
            }
          });
          // Now the stream has been published, lets try to set up some subscribers.
          this.client.on(ClientEvent.RemoteStreamAdded, (evt) => {
            this.remoteStream = evt.stream;
            if (this.remoteStream.getId() == 456) {
              this.client.subscribe(this.remoteStream, null, (err) => {
                console.log(err);
              });
            }
          });

          this.client.on(ClientEvent.RemoteStreamSubscribed, (evt) => {
            this.remoteStream = evt.stream;
            this.remoteStream.play('remote_stream');
          });

          this.client.on(ClientEvent.PeerLeave, (evt) => {
            let remoteStream = evt.stream;
            let id = remoteStream.getId();
            remoteStream.stop();
          });
          this.socket.emitMessage(
            'newGame',
            JSON.stringify({
              student: responseText.studentUsername,
              mentor: responseText.mentorUsername,
              role: userContent.role,
            })
          );

          this.socket.listen('boardState').subscribe((data) => {
            if (this.isReady) {
              let newData = JSON.parse(<string>data);
              var chessBoard = (<HTMLFrameElement>(
                document.getElementById('chessBd')
              )).contentWindow;
              chessBoard.postMessage(
                JSON.stringify({
                  boardState: newData.boardState,
                  color: newData.color,
                }),
                environment.urls.chessClientURL
              );
            } else {
              this.messageQueue.push(data);
            }
          });
        }
      );
    } else {
      //hide web cam styling
      document.getElementById('local_stream').style.display = 'none';
      document.getElementById('remote_stream').style.display = 'none';

      userContent = '';
    }

    this.socket.listen('gameOver').subscribe((data) => {
      alert('game over ');
    });

    var eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';

    // Listen to message from child window
    eventer(
      messageEvent,
      (e) => {
        if (e.origin == environment.urls.chessClientURL) {
          // Means that there is the board state and whatnot
          let info = e.data;
          console.log('info: ', info);

          if (info == 'ReadyToRecieve') {
            this.isReady = true;
            this.sendFromQueue();
          } else if (info == 'checkmate') {
            this.gameOverAlert();
          } else if (info == 'draw') {
            this.gameOverAlert();
          } else if (info == 'gameOver') {
            this.gameOverAlert();
          } else {
            this.updateBoardState(info);
          }
        }
      },
      false
    );
  }

  private sendFromQueue() {
    this.messageQueue.forEach((element) => {
      let newData = JSON.parse(<string>element);
      var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd'))
        .contentWindow;
      chessBoard.postMessage(
        JSON.stringify({
          boardState: newData.boardState,
          color: newData.color,
        }),
        environment.urls.chessClientURL
      );
    });
  }

  private httpGetAsync(theUrl: string, method: string = 'POST', callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open(method, theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader(
      'Authorization',
      `Bearer ${this.cookie.get('login')}`
    );
    xmlHttp.send(null);
  }

  public flipBoard() {
    let userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
    this.socket.emitMessage(
      'flipBoard',
      JSON.stringify({ username: userContent.username })
    );
  }

  public updateBoardState(data) {
    let userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
    this.socket.emitMessage(
      'newState',
      JSON.stringify({ boardState: data, username: userContent.username })
    );
  }

  public createNewGame() {
    let userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
    this.socket.emitMessage(
      'createNewGame',
      JSON.stringify({ username: userContent.username })
    );
  }

  public gameOverAlert() {
    let userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
    this.socket.emitMessage(
      'gameOver',
      JSON.stringify({ username: userContent.username })
    );
  }
}
