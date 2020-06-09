import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { setPermissionLevel} from "../globals";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private cookie: CookieService) {}

  async ngOnInit() {
    var pLevel = await setPermissionLevel(this.cookie);
    console.log(pLevel);
  }

}
