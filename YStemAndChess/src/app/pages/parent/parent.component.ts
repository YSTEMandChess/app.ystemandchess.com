import { Component, OnInit } from '@angular/core';
import { setPermissionLevel } from "../../globals";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  username;
  logged;

  constructor(private cookie: CookieService) { }

  async ngOnInit() {
    let pLevel = "nLogged";
    let uInfo = await setPermissionLevel(this.cookie);
    if (uInfo['error'] == undefined) {
      this.logged = true;
      pLevel = uInfo["role"];
      this.username = uInfo["username"];
    }
  }

}
