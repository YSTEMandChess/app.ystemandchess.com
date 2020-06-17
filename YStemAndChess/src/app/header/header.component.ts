import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { setPermissionLevel } from "../globals";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public username = "Owen Oertell";
  public logged = false;
  public playLink = "/play-nolog";

  constructor(private cookie: CookieService) { }

  async ngOnInit() {
    let pLevel = "nLogged";
    let uInfo = await setPermissionLevel(this.cookie);
    if (uInfo['error'] == undefined) {
      this.logged = true;
      pLevel = uInfo["role"];
      this.username = uInfo["username"];
    }


    // Disallowed extentions for each of the types of accounts
    const notAllowedExtsNotLoggedIn: String[] = ["/parent", "/student", "/play-mentor"];
    const notAllowedExtsStudent: String[] = ["/parent", "/play-mentor", "/signin", "/login"];
    const notAllowedExtsParent: String[] = ["/student", "/play-mentor", "/signin", "/login"];
    const notAllowedExtsMentor: String[] = ["/student", "/parent", "/signin", "/login"];
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

  public logout() {
    this.cookie.delete("login");
    window.location.reload();
  }

}
