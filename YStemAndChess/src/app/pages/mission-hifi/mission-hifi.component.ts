import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-mission-hifi',
  templateUrl: './mission-hifi.component.html',
  styleUrls: ['./mission-hifi.component.scss']
})
export class MissionHifiComponent implements OnInit {

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
    this.cookie.delete('this.newGameId');
  }

}