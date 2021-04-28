import { AfterViewInit, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LessonsService } from 'src/app/lessons.service';
import { Chess } from 'src/app/models/Chess';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-learnings',
  templateUrl: './learnings.component.html',
  styleUrls: ['./learnings.component.scss'],
})
export class LearningsComponent implements AfterViewInit {
  chess;
  info = 'Welcome to Learnings';
  isExpanded = false;
  chessSrc;

  constructor(private ls: LessonsService, private sanitization: DomSanitizer) {
    this.chessSrc = this.sanitization.bypassSecurityTrustResourceUrl(
      environment.urls.chessClientURL
    );
  }
  ngAfterViewInit() {
    this.chess = new Chess('chessBd', true);
    this.chess.newGameInit(
      'rnbqkbnr/ppppkppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    );
  }

  sections = this.ls.getLearnings();

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
    } else {
      elText = `[+] ${elText.substring(4)}`;
      panel.style.display = 'none';
    }
    event.srcElement.textContent = elText;
  }

  startLesson({ info, fen }): void {
    this.info = info;
    this.chess.newGameInit(fen);
  }
}
