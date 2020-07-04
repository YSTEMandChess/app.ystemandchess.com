import { CookieService } from 'ngx-cookie-service';
import { SocketService } from './../../socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-mentor',
  templateUrl: './play-mentor.component.html',
  styleUrls: ['./play-mentor.component.scss']
})
export class PlayMentorComponent implements OnInit {

  constructor(socket: SocketService, cookie: CookieService) { }

  ngOnInit(): void { 
  }

  public updateBoardState(data) {
    let userContent = JSON.parse(atob(this.cookie.get("login").split(".")[1]));
    console.log(`Sending an update: ${data}`);
    this.socket.emitMessage("newState", JSON.stringify({boardState: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", username: userContent.username}));
  }

}
