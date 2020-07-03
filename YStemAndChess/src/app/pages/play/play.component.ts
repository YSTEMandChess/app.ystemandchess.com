import { SocketService } from './../../socket.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as JitsiMeetExternalAPI from "../../../../src/assets/external_api.js";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  constructor(private cookie: CookieService, private socket: SocketService) { }

  ngOnInit() {
    let userContent = JSON.parse(atob(this.cookie.get("login").split(".")[1]));

    this.httpGetAsync(`http://127.0.0.1:8000/isInMeeting.php/?jwt=${this.cookie.get("login")}`, (response) => {
      if(response == "There are no current meetings with this user.") {
        return;
      }
      let responseText = JSON.parse(response);
      const domain = 'meet.jit.si';
      const options = {
        roomName: responseText.meetingID,
        parentNode: document.querySelector('.jitsi'),
        userInfo: {
          displayName: userContent.firstName + " " + userContent.lastName,
          email: userContent.email
        }
      };
      const api = new JitsiMeetExternalAPI(domain, options);
      api.executeCommand('subject', 'Chess Meeting');
      //api.executeCommand('startRecording');
      // Still need to lock the room. However finding the room name is technically viable as well as because it is on a closed network.
      

      this.socket.emitMessage("newGame", JSON.stringify({student: responseText.studentUsername, mentor: responseText.mentorUsername, role: userContent.role}));

      this.socket.listen("boardState").subscribe((data) => {
        console.log(data);
      })
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

  public updateBoardStateTest() {
    let userContent = JSON.parse(atob(this.cookie.get("login").split(".")[1]));
    console.log("Updating board state.");
    this.socket.emitMessage("newState", JSON.stringify({boardState: "thisistheboardstate", username: userContent.username}));
  }
}