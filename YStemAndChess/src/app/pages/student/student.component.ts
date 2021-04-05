import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket/socket.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(private socket: SocketService, private cookie: CookieService) { }

  ngOnInit(): void {
    
  }

  public newGame() {
    let userContent = JSON.parse(atob(this.cookie.get("login").split(".")[1]));
    this.socket.emitMessage("createNewGame", JSON.stringify({username: userContent.username}));
  }

}
