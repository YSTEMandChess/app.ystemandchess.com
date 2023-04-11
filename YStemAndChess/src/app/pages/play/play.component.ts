import { SocketService } from '../../services/socket/socket.service';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  SecurityContext,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewChecked,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { setPermissionLevel } from '../../globals';
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

var selected = null, // Object of the element to be moved
    x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
    x_elem = 0, y_elem = 0;


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  findStudentname = '';
  findMentorName = '';
  userRole='';
  private localStream: Stream;
  private localScreenStream: Stream;
  private remoteStream: Stream;
  private client: AgoraClient;
  private screenClient: AgoraClient;
  private clientUID;
  private messageQueue = new Array();
  private isReady: boolean;
  public chessSrc;
  private move: string;
  private pieceImage: string;
  private boardState: string;
  private scrollContainer: any;
  private isNearBottom = true;
  meetingId: string;
  boardstate: string;
  displayMoves = [];
  isStepLast: boolean = true;
  currentStep: number;

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

  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;
    ngOnInit() {
    let userContent;

    // let uInfo = await setPermissionLevel(this.cookie);
    // if (uInfo['error'] == undefined) {
    //   this.findStudentname = uInfo['username'];
    //   this.userRole = uInfo['role']
    
    // }

    if (this.cookie.check('login')) {
      userContent = JSON.parse(atob(this.cookie.get('login').split('.')[1]));
      console.log("user context----->",userContent)
      this.findStudentname = userContent.username;
      this.userRole = userContent.role;

      


      // window.onload = function() {
      //   var frameElement = document.getElementById("chessBd");
      //   var doc = frameElement.contentDocument;
      //   doc.body.contentEditable = true;
      //   doc.body.innerHTML = doc.body.innerHTML + '<style>body {margin: 0;}</style>'
      // }  

    //   window.onload = function() {
    //     let iframe = document.getElementById("chessBd");
    //     let doc = iframe.ownerDocument;
    //     document.body.innerHTML = doc.body.innerHTML + '<style>margin: 0;</style>';
  
    // //     let myiFrame = document.getElementById("iframe-css").ownerWindow;
    // //     let doc = myiFrame.document;
    // //     doc.body.innerHTML = doc.body.innerHTML + '<style>._2p3a{width: 100% !important;}</style>';
    //   };

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
          this.meetingId = responseText.meetingId;
          
          this.findMentorName= responseText.studentUsername;
          //display web cam styling
          document.getElementById('local_stream').style.display = 'block';
          document.getElementById('remote_stream').style.display = 'block';
          document.getElementById('local_stream').style.backgroundColor = '#00dff2';
          document.getElementById('remote_stream').style.backgroundColor = '#ff0000';
          document.getElementById('remote_stream').style.marginTop = '0px';
          document.getElementById('remote_stream').style.height = '215px';
          document.getElementById('local_stream').style.cursor = 'move';
          document.getElementById('remote_stream').style.cursor = 'move';
          document.getElementById('local_streamName').style.display = 'block';
          document.getElementById('remote_streamName').style.display = 'block';
          
          document.getElementById('draggable').style.position = 'absolute';
          document.getElementById('draggable-remote').style.position = 'absolute';
          document.getElementById('draggable-remote').style.top = '400px';
          

          // this.dragElement(document.getElementById("local_stream"));
         

          document.getElementById('draggable').onmousedown = () => {
            var element = document.getElementById("draggable");
            this._drag_init_Div(element);
            return false;
          }; 

          document.getElementById('draggable-remote').onmousedown = () => {
            var element = document.getElementById("draggable-remote");
            this._drag_init_Div(element);
            return false;
          }; 

        document.onmousemove = this._move_elem;
        document.onmouseup = this._destroy;
          

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
                  audio: true,
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
            } else {
              this.client.subscribe(
                this.remoteStream,
                { audio: true, video: false },
                (err) => {
                  console.log(err);
                }
              );
            }
          });

          this.client.on(ClientEvent.RemoteStreamSubscribed, (evt) => {
            this.remoteStream = evt.stream;
            this.remoteStream.play('remote_stream');
            if (userContent.role === 'mentor') {
              document.getElementById('player_789').style.display = 'none';
            } else {
              document.getElementById('remote_stream').style.display = 'none';
              document.getElementById('remote_streamName').style.display = 'none';
              
              
            }
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
            setTimeout(() => {
              this.getMovesList();
              setTimeout(() => {
                this.scrollToBottom();
              }, 1000);
            }, 1000);
            if (this.isReady && this.isStepLast) {
              let newData = JSON.parse(<string>data);
              var chessBoard = (<HTMLFrameElement>(
                document.getElementById('chessBd')
              )).contentWindow;
              // this.getMovesList();
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
      
      document.getElementById('local_streamName').style.display = 'none';
      document.getElementById('remote_streamName').style.display = 'none';

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
        if (environment.productionType === 'development') {
          if (e.origin == environment.urls.chessClientURL) {
            // Means that there is the board state and whatnot
            let info = e.data;
            const temp = info.split(':');
            const piece = info.split('-');

            if (info == 'ReadyToRecieve') {
              this.isReady = true;
              this.sendFromQueue();
            } else if (info == 'checkmate') {
              this.gameOverAlert();
            } else if (info == 'draw') {
              this.gameOverAlert();
            } else if (info == 'gameOver') {
              this.gameOverAlert();
            } else if (temp?.length > 1 && temp[0] === 'target') {
              this.move = temp[1];
            } else if (piece?.length > 1 && piece[0] === 'piece') {
              this.pieceImage = piece[1];
            } else {
              this.updateBoardState(info);
            }
          } else {
            console.log('chessClientURL Missmatch.');
          }
        } else {
          if (e.origin != environment.urls.chessClientURL) {
            // Means that there is the board state and whatnot
            let info = e.data;
            const temp = info.split(':');
            const piece = info.split('-');
            if (info == 'ReadyToRecieve') {
              this.isReady = true;
              this.sendFromQueue();
            } else if (info == 'checkmate') {
              this.gameOverAlert();
            } else if (info == 'draw') {
              this.gameOverAlert();
            } else if (info == 'gameOver') {
              this.gameOverAlert();
            } else if (temp?.length > 1 && temp[0] === 'target') {
              this.move = temp[1];
            } else if (piece?.length > 1 && piece[0] === 'piece') {
              this.pieceImage = piece[1];
            } else {
              this.updateBoardState(info);
            }
          } else {
            console.log('chessClientURL Missmatch.');
          }
        }
      },
      false
    );
  
  }

  _drag_init_Div(elem) {
    // Store the object of the element which needs to be moved
    //console.log(elem);
    selected = elem;
    x_elem = x_pos - selected.offsetLeft;
    y_elem = y_pos - selected.offsetTop;
  }


 _move_elem(e) {
  // x_pos = document.all ? window.e.clientX : e.pageX;
  // y_pos = document.all ? window.e.clientY : e.pageY;
  x_pos = document.all ?  (window as any).e.clientX : e.pageX;
  y_pos = document.all ? (window as any).e.clientY : e.pageY;
  console.log("Selected : ", selected);
   
  if (selected !== null) {
      selected.style.left = (x_pos - x_elem) + 'px';
      selected.style.top = (y_pos - y_elem) + 'px';
      
  }
}

_destroy() {
  selected = null;
}

 dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

  reload() {
    window.location.reload();
  }
  getMovesList = () => {
    let url: string = '';
    url = `${environment.urls.middlewareURL}/meetings/getBoardState?meetingId=${this.meetingId}`;
    this.httpGetAsync(url, 'GET', (response) => {
      response = JSON.parse(response);
      let finalMove =
        response.moves.length > 0
          ? response.moves[response.moves.length - 1]
          : response.moves;
      this.displayMoves = finalMove || [];
      this.currentStep = finalMove.length > 0 ? finalMove.length - 1 : 0;
    });
  };
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
  private changeBoardState(fen?) {
    var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd'))
      .contentWindow;
    chessBoard.postMessage(
      JSON.stringify({
        boardState: fen,
      }),
      environment.urls.chessClientURL
    );
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
    // this.getMovesList();
    if (this.meetingId == undefined) {
    } else {
      let url: string;
      url = `${environment.urls.middlewareURL}/meetings/boardState?meetingId=${this.meetingId}&fen=${data}&pos=${this.move}&image=${this.pieceImage}`;
      this.httpGetAsync(url, 'POST', (response) => {
        response = JSON.parse(response);
        let finalMove =
          response.moves.length > 0
            ? response.moves[response.moves.length - 1]
            : response.moves;
        this.displayMoves = finalMove || [];
        this.scrollToBottom();
      });
      setTimeout(() => {
        this.getMovesList();
        setTimeout(() => {
          this.scrollToBottom();
        }, 500);
      }, 1000);
    }
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
  setMove(index, direction) {
    this.currentStep =
      index <= 0
        ? 0
        : index > this.displayMoves.length - 1
        ? this.displayMoves.length - 1
        : index;
    if (direction != 'backward') {
      if (this.displayMoves.length - 1 === index) {
        this.isStepLast = true;
        this.reload();
      } else {
        this.isStepLast = false;
      }
    } else {
      if (this.displayMoves.length <= index) {
        this.isStepLast = true;
        this.reload();
      } else {
        this.isStepLast = false;
      }
    }
    let movePos = 0;
    if (index <= 0) {
      movePos = 0;
    } else {
      movePos = index - 1;
    }
    this.changeBoardState(this.displayMoves[movePos]?.fen);
    if (this.isNearBottom) {
      this.scrollToBottom();
    }
  }
  imgPos(index) {
    return (
      '../../../assets/images/chessPieces/wikipedia/' +
      this.displayMoves[index].image +
      '.png'
    );
  }

  private scrollToBottom(): void {
    this.scrollContainer = this.scrollFrame?.nativeElement;
    this.scrollContainer?.scroll({
      top: this.scrollContainer?.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }
  private isUserNearBottom(): boolean {
    const threshold = 150;
    const position =
      this.scrollContainer?.scrollTop + this.scrollContainer?.offsetHeight;
    const height = this.scrollContainer?.scrollHeight;
    return position > height - threshold;
  }

  scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();
  }
}
