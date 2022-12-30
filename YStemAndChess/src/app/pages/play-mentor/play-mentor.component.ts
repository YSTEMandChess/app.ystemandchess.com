import { CookieService } from 'ngx-cookie-service';
import { SocketService } from '../../services/socket/socket.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-play-mentor',
  templateUrl: './play-mentor.component.html',
  styleUrls: ['./play-mentor.component.scss']
})
export class PlayMentorComponent implements OnInit {
  meetingId;
  displayMoves = [];
  constructor(private socket: SocketService, private cookie: CookieService) { }

  ngOnInit(): void { 
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
          this.meetingId = responseText.meetingId;
        }
      );
    }
  }
  getMovesList = () => {
    let url: string = '';
    url = `${environment.urls.middlewareURL}/meetings/getBoardState?meetingId=${this.meetingId}`;
    this.httpGetAsync(url, 'GET', (response) => {
      response = JSON.parse(response);
      this.displayMoves = response.moves || [];
    });
  };
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
    let userContent = JSON.parse(atob(this.cookie.get("login").split(".")[1]));
    this.socket.emitMessage("flipBoard", JSON.stringify({username: userContent.username}))
  }

  public newGame() {
    let userContent = JSON.parse(atob(this.cookie.get("login").split(".")[1]));
    this.socket.emitMessage("createNewGame", JSON.stringify({username: userContent.username}));
    this.getMovesList();
    let url: string;
    url = `${environment.urls.middlewareURL}/meetings/newBoardState?meetingId=${this.meetingId}`;
    this.httpGetAsync(url, 'POST', (response) => {
      response = JSON.parse(response);
      this.displayMoves = response.moves || [];
    });
  }

}