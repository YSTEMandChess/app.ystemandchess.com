import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LessonsService } from 'src/app/lessons.service';
import { Chess } from 'src/app/models/Chess';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-learnings',
  templateUrl: './learnings.component.html',
  styleUrls: ['./learnings.component.scss'],
})
export class LearningsComponent {
  chess;
  info = 'Welcome to Learnings';
  isExpanded = false;
  chessSrc;

  constructor(private ls: LessonsService, private sanitization: DomSanitizer) {
    this.chessSrc = this.sanitization.bypassSecurityTrustResourceUrl(
      environment.urls.chessClientURL
    );
    this.chess = new Chess('chessBd', true);
  }

  sections = this.ls.getLearnings();

  onSectionClick(event): void {
    /* chaging the +  and -,
    to highlight the button that controls the panel */
    /* Toggle between hiding and showing the active panel */

    let elText = event.srcElement.textContent;
    let panel = event.srcElement.nextElementSibling;

    if (elText.split('').indexOf('+') > -1) {
      elText = `[-] ${elText.substring(4)}`;
      panel.style.display = 'block';
    } else {
      elText = `[+] ${elText.substring(4)}`;
      panel.style.display = 'none';
    }
    event.srcElement.textContent = elText;
  }

  onSubSectionClick({ info, fen }): void {
    this.info = info;
    this.chess.newGameInit(fen);
  }
}
