import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Chess } from 'src/app/models/Chess';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss'],
})
export class PracticeComponent implements OnInit {
  chess;
  info = 'Welcome to Practice';
  isExpanded = false;
  chessSrc;
  sections;

  constructor(
    private sanitization: DomSanitizer,
    private cookie: CookieService
  ) {
    this.chessSrc = this.sanitization.bypassSecurityTrustResourceUrl(
      environment.urls.chessClientURL
    );
    this.chess = new Chess('chessBd', true);
    this.httpGetAsync(
      `${environment.urls.middlewareURL}/practice/getpractices`,
      'GET',
      (response) => {
        this.sections = JSON.parse(response);
      }
    );
  }
  // sections = this.ps.getPractices();

  showSubSection(event): void {
    /* chaging the +  and -,
    to highlight the button that controls the panel */
    /* Toggle between hiding and showing the active panel */

    let elText = event.srcElement.textContent;
    let panel = event.srcElement.nextElementSibling;
    const index = elText.split('').indexOf('+');

    if (index > -1 && index < 4) {
      elText = `[-] ${elText.substring(4)}`;
      panel.style.display = 'block';
      panel.style.height = '10rem';
      panel.style.overflow = 'hidden scroll';
    } else {
      elText = `[+] ${elText.substring(4)}`;
      panel.style.display = 'none';
    }
    event.srcElement.textContent = elText;
  }
  startLesson({ info, startFen }): void {
    this.info = info;
    this.chess.newGameInit(startFen);
  }

  ngOnInit(): void {}

  private httpGetAsync(theUrl: string, method: string = 'POST', callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      callback(xmlHttp.responseText);
    };
    xmlHttp.open(method, theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader(
      'Authorization',
      `Bearer ${this.cookie.get('login')}`
    );
    xmlHttp.send(null);
  }
}
