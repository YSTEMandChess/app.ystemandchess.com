import { Component, OnInit } from '@angular/core';
import { SocketService } from './../../socket.service';
import { setPermissionLevel } from "../../globals";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  private logged: boolean;
  username: string;
  
  constructor(private socket: SocketService, private cookie: CookieService) { }

  ngOnInit(): void {
    this.getUsername();
  }

  public newGame() {
    let userContent = JSON.parse(atob(this.cookie.get("login").split(".")[1]));
    this.socket.emitMessage("createNewGame", JSON.stringify({username: userContent.username}));
  }

  public getName() {
    console.log(this.username);
    this.username;
  }

  private async getUsername() {
    let pLevel = "nLogged";
    let uInfo = await setPermissionLevel(this.cookie);
    if (uInfo['error'] == undefined) {
      this.logged = true;
      pLevel = uInfo["role"];
      this.username = uInfo["username"];
      console.log(uInfo["username"]);
    }
  }
}
