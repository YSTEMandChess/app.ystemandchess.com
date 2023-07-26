import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
    this.cookie.delete('this.newGameId');
  }

}
