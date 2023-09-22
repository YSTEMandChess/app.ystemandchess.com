import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-computer-article',
  templateUrl: './computer-benefit-article.component.html',
  styleUrls: ['./computer-benefit-article.component.scss']
})
export class ComputerBenefitArticleComponent implements OnInit {

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
    this.cookie.delete('this.newGameId');
  }

}