import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-chess-benefit-article',
  templateUrl: './chess-benefit-article.component.html',
  styleUrls: ['./chess-benefit-article.component.scss']
})
export class ChessBenefitArticleComponent implements OnInit {

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
    this.cookie.delete('this.newGameId');
  }

}