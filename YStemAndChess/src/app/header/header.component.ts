import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit} from '@angular/core';
import { ModalService } from '../_modal';
import { setPermissionLevel } from '../globals';
import { SocketService } from './../socket.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  public username = "";
  public role = "";
  public logged = false;
  private foundFlag = false;
  private endFlag = false;
  public playLink = "/play-nolog";
  public inMatch = false;

  constructor(private cookie: CookieService, private modalService: ModalService,
    private socket: SocketService) {
      
    }

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
          } else {
            this.inMatch = true;
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
      if (response == "There are no current meetings with this user." || pLevel == "nLogged" || "Please be either a student or a mentor.") {
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
          this.gameFound(url);
          if (this.foundFlag === true || this.endFlag === true) {
            console.log("modal should close");
            this.endFlag = false;
            this.foundFlag = false;
            this.closeModal("find-game");
            // GAME FOUND.
            clearInterval(meeting);
            this.redirect(this.role);
            this.inMatch = true;
          }
        }, 200)
      }
    });
  }

  private async gameFound(url) {
    await this.httpGetAsync(url, (response) => {
      console.log(response);
      if(response === "There are no current meetings with this user.") {
        let url = `http://127.0.0.1:8000/pairUp.php/?jwt=${this.cookie.get("login")}`;
        console.log("about to create game");
        this.createGame(url);
      }

      try {
        let s = JSON.parse(response);
        console.log("I am here");
        this.foundFlag = true;
      } catch (Error) {
        console.log(Error.message);
      }
    });
  }

  private async createGame(url) {
    console.log("creating game");
    await this.httpGetAsync(url, (reply) => {
      console.log(reply);
    }); 
  }

  private redirect(role) {
    if(role === "student"){
      window.location.pathname = "/student";
    } else if(role == "mentor") {
      window.location.pathname = "/play-mentor";
    }
  }

  private async httpGetAsync(theUrl: string, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
  }

  public logout() {
    this.leaveMatch();
    this.cookie.delete("login");
    window.location.reload();
  }

  public leaveMatch() {
    this.httpGetAsync(`http://127.0.0.1:8000/endMeeting.php/?jwt=${this.cookie.get("login")}`, (response) => {});
    this.endGame();
    this.inMatch = false;
  }

  public endGame() {
    let userContent = JSON.parse(atob(this.cookie.get("login").split(".")[1]));
    this.socket.emitMessage("endGame", JSON.stringify({username: userContent.username}));
  }

}
