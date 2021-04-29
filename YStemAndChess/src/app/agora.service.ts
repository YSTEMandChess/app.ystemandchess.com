import { Injectable } from '@angular/core';
import { AgoraClient, ClientEvent, NgxAgoraService, Stream } from 'ngx-agora';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgoraService {
  private client: AgoraClient;
  private clientUID;
  private localStream: Stream;

  constructor(
    private cookie: CookieService,
    private agoraService: NgxAgoraService
  ) {}

  public videoOn(localStreamID: string, remoteStreamID: string) {
    this.httpGetAsync(
      `${environment.urls.middlewareURL}/isInMeeting.php/?jwt=${this.cookie.get(
        'login'
      )}`,
      (response) => {
        if (response == 'There are no current meetings with this user.') {
          return;
        }
        console.log({ response });
        let responseText = JSON.parse(response);
        this.client = this.agoraService.createClient({
          mode: 'rtc',
          codec: 'h264',
        });
        this.client.init(
          environment.agora.appId,
          () => console.log('init sucessful'),
          () => console.log('init unsucessful')
        );
        this.client.join(null, responseText.meetingID, null, (uid) => {
          console.log('uid: ' + uid);
          this.clientUID = uid;

          this.localStream = this.agoraService.createStream({
            streamID: this.clientUID,
            audio: true,
            video: true,
            screen: false,
          });

          this.localStream.init(
            () => {
              this.localStream.play(localStreamID);
              this.client.publish(this.localStream, function (err) {
                console.log('publish failed');
                console.error(err);
              });
            },
            () => console.log("THE LOCAL STREAM WANSN'T SUCESSFULL")
          );
        });

        // Now the stream has been published, lets try to set up some subscribers.
        this.client.on(ClientEvent.RemoteStreamAdded, (evt) => {
          let remoteStream = evt.stream;
          let id = remoteStream.getId();
          if (id != this.clientUID) {
            this.client.subscribe(remoteStream, null, (err) => {
              console.log(
                'it appears that something has gone wrong with the subscribing.'
              );
            });
            console.log('stream-added remote-uid: ', id);
          }
          console.log('hmm, is this any good?');
        });

        this.client.on(ClientEvent.RemoteStreamSubscribed, (evt) => {
          let remoteStream = evt.stream;
          let id = remoteStream.getId();
          remoteStream.play(remoteStreamID);
          console.log('stream-subscribed remote-uid: ', id);
        });

        this.client.on(ClientEvent.PeerLeave, (evt) => {
          let remoteStream = evt.stream;
          let id = remoteStream.getId();
          remoteStream.stop();
          console.log('hmm, is this any good?');
        });
      }
    );
  }
  private httpGetAsync(theUrl: string, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open('POST', theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }
}
