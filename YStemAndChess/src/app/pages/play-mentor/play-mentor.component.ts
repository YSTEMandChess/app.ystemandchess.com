import { CookieService } from 'ngx-cookie-service';
import { SocketService } from './../../socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-mentor',
  templateUrl: './play-mentor.component.html',
  styleUrls: ['./play-mentor.component.scss']
})
export class PlayMentorComponent implements OnInit {

  constructor(private socket: SocketService, private cookie: CookieService) { }

  ngOnInit(): void { 
  }

  public flipBoard() {
    let userContent = JSON.parse(atob(this.cookie.get("login").split(".")[1]));
    this.socket.emitMessage("flipBoard", JSON.stringify({username: userContent.username}))
  }

  public newGame() {
    let userContent = JSON.parse(atob(this.cookie.get("login").split(".")[1]));
    this.socket.emitMessage("createNewGame", JSON.stringify({username: userContent.username}));
  }

}
