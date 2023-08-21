import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-mentoring-benefit-article',
  templateUrl: './mentoring-benefit-article.component.html',
  styleUrls: ['./mentoring-benefit-article.component.scss']
})
export class MentoringBenefitArticleComponent implements OnInit {

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
    this.cookie.delete('this.newGameId');
  }

}