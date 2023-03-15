import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LessonsService } from 'src/app/lessons.service';
import { Chess } from 'src/app/models/Chess';
import { environment } from 'src/environments/environment';
import { setPermissionLevel } from '../../globals';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-learnings',
  templateUrl: './learnings.component.html',
  styleUrls: ['./learnings.component.scss'],
})
export class LearningsComponent {
  public playLink = 'play-nolog';
  public username = '';
  public role = '';
  public link = '';
  public logged = false;
  chess;
  info = 'Welcome to Learnings';
  isExpanded = false;
  chessSrc;
  sections;
  currentFen;
  activeState = 'false';
  lessonNumber = 0;

  constructor(private ls: LessonsService, private sanitization: DomSanitizer,private cookie: CookieService,) {
   
    this.chessSrc = this.sanitization.bypassSecurityTrustResourceUrl(
      environment.urls.chessClientURL
    );
    this.chess = new Chess('chessBd', true);
    this.loadLessons();
    
  }

  

  async ngOnInit() {
    let pLevel = 'nLogged';
    let uInfo = await setPermissionLevel(this.cookie);
    if (uInfo['error'] == undefined) {
      this.logged = true;
      pLevel = uInfo['role'];
      this.username = uInfo['username'];
      this.role = uInfo['role'];
      if (this.role === 'student') {
        this.playLink = 'student';
      } else if (this.role === 'mentor') {
        this.playLink = 'play-mentor';
      }
    }
  }

  setStateAsActive(state) {
    this.activeState = state;
    
    console.log("active state--->", this.activeState)
  }

  loadNextLesson(){
    this.lessonNumber = this.lessonNumber+1;
    this.loadLessons();
  }

  loadPrevLesson(){
    this.lessonNumber = this.lessonNumber-1;
    this.loadLessons();
  }

  loadLessons(){
    this.sections = this.ls.getLearnings(this.lessonNumber);
  }

  refresh() {
    this.chess.newGameInit(this.currentFen);
  }
  

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

  startLesson({ info, fen,event }): void {
    this.info = info;
    this.chess.newGameInit(fen);
    this.currentFen = fen;

  }
}
