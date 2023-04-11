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
  activeState = {
    name: 'Basic',
    fen: '8/8/8/P7/8/5p2/8/8 w k - 0 1',
    info: `Pawns move one square only.
    But when they reach the other side of the board, they become a stronger piece!`,
  };
  lessonNumber = 0;
  activeTabIndex = 0
  

  constructor(private ls: LessonsService, private sanitization: DomSanitizer,private cookie: CookieService) {
   
    this.chessSrc = this.sanitization.bypassSecurityTrustResourceUrl(
      environment.urls.chessClientURL
    );
    this.chess = new Chess('chessBd', true);
   
    this.loadLessons();
    // this.setStateAsActive(this.ls.learningsArray[0].subSections[0].fen);
  }

  

  async ngOnInit() {
    let pLevel = 'nLogged';
    this.setStateAsActive(this.ls.learningsArray[0].subSections[0]);
    this.activeState = this.ls.learningsArray[0].subSections[0];
    
    console.log("active state--->", this.activeState)
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

    // this.startLesson(this.ls.learningsArray[0].subSections[0]);
  }

  setStateAsActive(state) {
  console.log("click state---->", state)
  var firstObj = {
    'info': state.info,
    'fen': state.fen,
    'event':''
  };
  console.log("first obj---->", firstObj)
  
  setTimeout(() => {
    // this.chess.newGameInit(state.fen);
    this.activeState = state;
    this.startLesson(firstObj);
  }, 500);
    

    
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
  console.log("start lesson call---->", info)
    this.info = info;
    this.chess.newGameInit(fen);
    this.currentFen = fen;
    
  }
}
