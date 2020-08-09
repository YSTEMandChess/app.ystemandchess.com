import { SocketService } from './../../socket.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AgoraClient, ClientEvent, NgxAgoraService, Stream, StreamEvent } from 'ngx-agora';
import { environment } from 'src/environments/environment';

//import * as JitsiMeetExternalAPI from "../../../../src/assets/external_api.js";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  private localStream: Stream;
  private client: AgoraClient;
  private clientUID;
  private messageQueue = new Array();
  private isReady: boolean;

  constructor(private cookie: CookieService, private socket: SocketService, private agoraService: NgxAgoraService) { }

  ngOnInit() {
    let userContent = JSON.parse(atob(this.cookie.get("login").split(".")[1]));

    this.httpGetAsync(`http://127.0.0.1:8000/isInMeeting.php/?jwt=${this.cookie.get("login")}`, (response) => {
      if (response == "There are no current meetings with this user.") {
        return;
      }
      let responseText = JSON.parse(response);
      

      // Code for webcam
      // ------------------------------------------------------------------------- 
      this.client = this.agoraService.createClient({ mode: "rtc", codec: "h264" });
      this.client.init("6c368b93b82a4b3e9fb8e57da830f2a4", () => console.log("init sucessful"), () => console.log("init unsucessful"))
      this.client.join(null, responseText.meetingID, null, (uid) => {
        console.log("uid: " + uid);
        this.clientUID = uid;

        this.localStream = this.agoraService.createStream({
          streamID: this.clientUID,
          audio: true,
          video: true,
          screen: false
        })

        this.localStream.init(() => {
          this.localStream.play("local_stream");
          this.client.publish(this.localStream, function (err) {
            console.log("publish failed");
            console.error(err);
          })
        }, () => console.log("THE LOCAL STREAM WANSN'T SUCESSFULL"));
      })

      // Now the stream has been published, lets try to set up some subscribers.
      this.client.on(ClientEvent.RemoteStreamAdded, (evt) => {
        let remoteStream = evt.stream;
        let id = remoteStream.getId();
        if (id != this.clientUID) {
          this.client.subscribe(remoteStream, null, (err) => {
            console.log("it appears that something has gone wrong with the subscribing.");
          })
          console.log("stream-added remote-uid: ", id);
        }
        console.log("hmm, is this any good?")

      })

      this.client.on(ClientEvent.RemoteStreamSubscribed, (evt) => {
        let remoteStream = evt.stream;
        let id = remoteStream.getId();
        remoteStream.play("remote_stream");
        console.log("stream-subscribed remote-uid: ", id);
      })

      this.client.on(ClientEvent.PeerLeave, (evt) => {
        let remoteStream = evt.stream;
        let id = remoteStream.getId();
        remoteStream.stop();
        console.log("hmm, is this any good?")
      })
      // --------------------------------------------------------------------------

      console.log("I just connected to the website. Thus, I will send a message saying that I want them to create a new game.");
      this.socket.emitMessage("newGame", JSON.stringify({ student: responseText.studentUsername, mentor: responseText.mentorUsername, role: userContent.role }));

      this.socket.listen("boardState").subscribe((data) => {
        if(this.isReady) {
          let newData = JSON.parse(<string>data);
          console.log(`New Board State Received: ${data}`);
          var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd')).contentWindow;
          chessBoard.postMessage(JSON.stringify({ boardState: newData.boardState, color: newData.color }), "http://localhost");
        } else {
          this.messageQueue.push(data);
        }
      })
    });

    this.socket.listen("gameOver").subscribe((data) => {
      alert("game over ");
    });

    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

    // Listen to message from child window
    eventer(messageEvent, (e) => {
      if (e.origin == "http://localhost") {
        // Means that there is the board state and whatnot
        //console.log("There is a new board state. Going to update!")
        console.log("this does work every time");
        let info = e.data;
        console.log("I am info " + info);
        //console.log("I am info " + info);
        //console.log("I am above ready to recieve");
        if(info == "ReadyToRecieve") {
          this.isReady=true;
          this.sendFromQueue();
        } else if(info == "checkmate") {
          this.gameOverAlert();
        } else if(info == "draw") {
          this.gameOverAlert();
        } else if(info == "gameOver") {
          this.gameOverAlert();
        } else {
          this.updateBoardState(info);
        }
      }
    }, false);

  }

  private sendFromQueue() {
    this.messageQueue.forEach(element => {
          let newData = JSON.parse(<string>element);
          console.log(`New Board State Received: ${element}`);
          var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd')).contentWindow;
          chessBoard.postMessage(JSON.stringify({ boardState: newData.boardState, color: newData.color }), "http://localhost");
    });
  }

  private httpGetAsync(theUrl: string, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
  }

  public flipBoard() {
    let userContent = JSON.parse(atob(this.cookie.get("login").split(".")[1]));
    this.socket.emitMessage("flipBoard", JSON.stringify({ username: userContent.username }))
  }

  public updateBoardState(data) {
    let userContent = JSON.parse(atob(this.cookie.get("login").split(".")[1]));
    console.log(`Sending an update: ${data}`);
    this.socket.emitMessage("newState", JSON.stringify({ boardState: data, username: userContent.username }));
  }

  public createNewGame() {
    let userContent = JSON.parse(atob(this.cookie.get("login").split(".")[1]));
    this.socket.emitMessage("createNewGame", JSON.stringify({ username: userContent.username }));
  }

  public gameOverAlert() {
    let userContent = JSON.parse(atob(this.cookie.get("login").split(".")[1]));
    this.socket.emitMessage("gameOver", JSON.stringify({username: userContent.username}));
  }
}
