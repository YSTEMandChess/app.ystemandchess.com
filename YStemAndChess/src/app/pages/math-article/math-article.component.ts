import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-math-article',
  templateUrl: './math-article.component.html',
  styleUrls: ['./math-article.component.scss']
})
export class MathArticleComponent implements OnInit {

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
    this.cookie.delete('this.newGameId');
  }

}