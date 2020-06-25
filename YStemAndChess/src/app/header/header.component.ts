import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { setPermissionLevel } from "../globals";
import { allowedNodeEnvironmentFlags } from 'process';
import { ModalService } from '../_modal';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public username = "Owen Oertell";
  public role = "";
  public logged = false;
  public playLink = "/play-nolog";

  constructor(private cookie: CookieService,
    private modalService: ModalService) { }

  async ngOnInit() {
    let pLevel = "nLogged";
    let uInfo = await setPermissionLevel(this.cookie);
    if (uInfo['error'] == undefined) {
      this.logged = true;
      pLevel = uInfo["role"];
      this.username = uInfo["username"];
      this.role = uInfo["role"];
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
        this.playLink="/student";
        notAllowedExtsStudent.forEach(element => {
          if (pageExt == element) {
            window.location.pathname = "/student";
          }
        });
        break;
      case "parent":
        this.playLink="/parent";
        notAllowedExtsParent.forEach(element => {
          if (pageExt == element) {
            window.location.pathname = "/parent";
          }
        });
        break;
      case "mentor":
        this.playLink="/play-mentor";
        notAllowedExtsMentor.forEach(element => {
          if (pageExt == element) {
            window.location.pathname = "/play-mentor";
          }
        });
        break;
      case "admin":
        this.playLink="/admin";
        notAllowedExtsAdmin.forEach(element => {
          if (pageExt == element) {
            window.location.pathname = "/admin";
          }
        });
        break;
      case "nLogged":
        this.playLink = "/play";
        notAllowedExtsNotLoggedIn.forEach(element => {
          if (pageExt == element) {
            window.location.pathname = "/";
          }
        });
        break;
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  public findGame() {
    let url = `http://127.0.0.1:8000/newGame.php/?jwt=${this.cookie.get("login")}`;
    this.httpGetAsync(url, (response) => {
      console.log(response);
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

  public logout() {
    this.cookie.delete("login");
    window.location.reload();
  }

}
