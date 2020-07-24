import { SocketService } from './../socket.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { setPermissionLevel } from "../globals";
import { allowedNodeEnvironmentFlags } from 'process';
import { ModalService } from '../_modal';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public username = "";
  public role = "";
  public logged = false;
  private foundFlag = false;
  private endFlag = false;
  public playLink = "/play-nolog";
  public inMatch = false;

  constructor(private cookie: CookieService,
    private modalService: ModalService, private soc: SocketService) { }

  async ngOnInit() {
    let pLevel = "nLogged";
    let uInfo = await setPermissionLevel(this.cookie);
    if (uInfo['error'] == undefined) {
      this.logged = true;
      pLevel = uInfo["role"];
      this.username = uInfo["username"];
      this.role = uInfo["role"];
    }
    if (this.role == 'student' || this.role == 'mentor') {
      setInterval(() => {
        let url = `http://127.0.0.1:8000/isInMeeting.php/?jwt=${this.cookie.get("login")}`;
        this.httpGetAsync(url, (response) => {
          if (response == "There are no current meetings with this user.") {
            this.inMatch = false;
          }
        });

      }, 10000);
    }



    // Disallowed extentions for each of the types of accounts
    const notAllowedExtsNotLoggedIn: String[] = ["/parent", "/parent-add-student", "/student", "/play-mentor", "/mentor-dashboard", "/admin"];
    const notAllowedExtsStudent: String[] = ["/parent", "/parent-add-student", "/play-mentor", "/mentor-dashboard", "/signin", "/login", "/admin"];
    const notAllowedExtsParent: String[] = ["/student", "/play-mentor", "/mentor-dashboard", "/signin", "/login", "/admin"];
    const notAllowedExtsMentor: String[] = ["/student", "/parent", "/parent-add-student", "/signin", "/login"];
    const notAllowedExtsAdmin: String[] = ["/signin", "/login"];

    let pageExt = window.location.pathname;

    switch (pLevel) {
      case "student":
        this.playLink = "/student";
        notAllowedExtsStudent.forEach(element => {
          if (pageExt == element) {
            window.location.pathname = "/student";
          }
        });
        break;
      case "parent":
        this.playLink = "/parent";
        notAllowedExtsParent.forEach(element => {
          if (pageExt == element) {
            window.location.pathname = "/parent";
          }
        });
        break;
      case "mentor":
        this.playLink = "/play-mentor";
        notAllowedExtsMentor.forEach(element => {
          if (pageExt == element) {
            window.location.pathname = "/play-mentor";
          }
        });
        break;
      case "admin":
        this.playLink = "/admin";
        notAllowedExtsAdmin.forEach(element => {
          if (pageExt == element) {
            window.location.pathname = "/admin";
          }
        });
        break;
      case "nLogged":
        this.playLink = "/play-nolog";
        notAllowedExtsNotLoggedIn.forEach(element => {
          if (pageExt == element) {
            window.location.pathname = "/";
          }
        });
        break;
    }

    // Check to see if they are currently in a game, or not.
    let url = `http://127.0.0.1:8000/isInMeeting.php/?jwt=${this.cookie.get("login")}`;
    this.httpGetAsync(url, (response) => {
      // They are currently in a meeting. So set it up.
      if (response == "There are no current meetings with this user." || pLevel == "nLogged") {
        this.inMatch = false;
      } else {
        this.inMatch = true;
      }
    });

  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  public removeFromWaiting() {
    let url = `http://127.0.0.1:8000/endSearch.php/?jwt=${this.cookie.get("login")}`;
    this.httpGetAsync(url, (response) => {
      console.log(response);
    });
    this.endFlag = true;
  }

  public findGame() {
    let url = `http://127.0.0.1:8000/newGame.php/?jwt=${this.cookie.get("login")}`;
    this.httpGetAsync(url, (response) => {
      console.log(response);
      if (response === 'Person Added Sucessfully.') {
        url = `http://127.0.0.1:8000/isInMeeting.php/?jwt=${this.cookie.get("login")}`;
        let meeting = setInterval(() => {
          if (this.gameFound(url) === true || this.endFlag === true) {
            this.endFlag = false;
            this.closeModal("find-game");
            // GAME FOUND.
            clearInterval(meeting);
            location.reload();
          }
        }, 200)
      }
    });
  }

  private gameFound(url) {
    this.httpGetAsync(url, (response) => {
      //console.log(response);
      let s;
      try {
        s = JSON.parse(response);
        this.foundFlag = true;
      } catch (Error) {
        console.log(Error.message);
      }
    });
    console.log(this.foundFlag);
    return this.foundFlag;
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

  public logout() {
    this.cookie.delete("login");
    window.location.reload();
  }

  public leaveMatch() {
    this.httpGetAsync(`http://127.0.0.1:8000/endMeeting.php/?jwt=${this.cookie.get("login")}`, (response) => {});
    location.reload();
  }

}
