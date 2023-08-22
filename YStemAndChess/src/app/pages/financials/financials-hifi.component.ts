import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-financials-hifi',
  templateUrl: './financials-hifi.component.html',
  styleUrls: ['./financials-hifi.component.scss']
})
export class FinancialsHifiComponent implements OnInit {

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
    this.cookie.delete('this.newGameId'); // remove new game id from other component
  }

}

