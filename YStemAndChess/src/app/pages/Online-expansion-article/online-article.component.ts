import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-online-article',
  templateUrl: './online-article.component.html',
  styleUrls: ['./online-article.component.scss']
})
export class OnlineArticleComponent implements OnInit {

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
    this.cookie.delete('this.newGameId');
  }

}