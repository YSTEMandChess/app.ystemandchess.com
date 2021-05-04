import { AfterViewInit, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LessonsService } from 'src/app/lessons.service';
import { Chess } from 'src/app/models/Chess';
import { SocketService } from 'src/app/services/socket/socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-learnings',
  templateUrl: './learnings.component.html',
  styleUrls: ['./learnings.component.scss'],
})
export class LearningsComponent implements AfterViewInit {
  @Input('online') online: boolean = false;
  @Input('studentId') studentId;
  @Input('mentorId') mentorId;
  chess;
  info = 'Welcome to Learnings';
  isExpanded = false;
  chessSrc;

  constructor(
    private ls: LessonsService,
    private sanitization: DomSanitizer,
    private socket: SocketService
  ) {
    this.chessSrc = this.sanitization.bypassSecurityTrustResourceUrl(
      environment.urls.chessClientURL
    );
  }
  ngAfterViewInit() {
    this.chess = new Chess(
      'chessBd',
      true,
      this.online,
      this.studentId,
      this.mentorId,
      this.socket
    );
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
