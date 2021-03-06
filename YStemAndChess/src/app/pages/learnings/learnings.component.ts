import { Component, OnInit } from '@angular/core';
import { LessonsService } from 'src/app/lessons.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-learnings',
  templateUrl: './learnings.component.html',
  styleUrls: ['./learnings.component.scss'],
})
export class LearningsComponent implements OnInit {
  private messageQueue = new Array();
  private isReady: boolean;
  private color: String = 'white';
  private level: number = 5;
  private currentFEN: string = '3qkbnr/3ppppp/8/8/8/8/8/6QN w k - 0 1';
  private prevFEN: String = this.currentFEN;
  private flag: boolean = false;

  constructor(private ls: LessonsService) {}

  sections = this.ls.getLearnings();

  info = 'Welcome to Lernings';
  isExpanded = false;
  activeClass = '';

  onSectionClick(event): void {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.activeClass = 'active';
    if (event.srcElement.textContent[1] === '+') {
      event.srcElement.textContent = `[-] ${event.srcElement.textContent.substring(
        4
      )}`;
    } else {
      event.srcElement.textContent = `[+] ${event.srcElement.textContent.substring(
        4
      )}`;
    }

    /* Toggle between hiding and showing the active panel */
    let panel = event.srcElement.nextElementSibling;
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }
  }

  onSubSectionClick(details): void {
    console.log(details);
    this.info = details.info;
    this.setLesson(details.fen);
  }

  setLesson(fen: string) {
    this.newGameInit(fen);
  }

  dataTransform(data) {
    if (data.split('/')[7]) {
      let laststring = data.split('/')[7].split(' ');
      laststring[1] = 'w';
      laststring[2] = '-';
      laststring[3] = '-';
      laststring[4] = '0';
      laststring[5] = '1';
      laststring = laststring.join(' ');
      let tranfomed = data.split('/');
      tranfomed[7] = laststring;
      return tranfomed.join('/');
    }
    return data;
  }

  ngOnInit(): void {
    var eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';

    this.newGameInit('3qqbnq/3ppppp/8/8/8/8/8/6qN w k - 0 1');

    // Listen to message from child window
    eventer(
      messageEvent,
      (e) => {
        if (this.flag && e.data.indexOf('p') === -1)
          window.removeEventListener(messageEvent, eventer);

        // Means that there is the board state and whatnot
        console.log('CURENET FEN !!!!!!' + e.data);

        this.prevFEN = this.currentFEN;

        const info = this.dataTransform(e.data);

        console.log('This is info ', info);
        if (info == 'ReadyToRecieve') {
          this.isReady = true;

          this.sendFromQueue();
        } else {
          this.messageQueue.push(
            JSON.stringify({
              boardState: info,
              color: this.color,
              lessonFlag: true,
            })
          );
          this.sendFromQueue();
        }
        if (e.data.indexOf('p') === -1 && this.flag) {
          setTimeout(() => {
            alert('Lesson complited.');
          }, 200);
        }
        this.flag = true;
      },

      false
    );
  }
  ////// Making the request to the server  ///////////

  private httpGetAsync(theUrl: string, callback) {
    callback(this.currentFEN);
  }
  /** 
   *  WHAT USED TO BE INSIDE ======> httpGetAsync < ======
   * var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      callback(xmlHttp.responseText);
    };
    xmlHttp.open('POST', theUrl, true); // true for asynchronous
    xmlHttp.send(null) */
  //////////////    SENDING MASSAGES  ABOUT THE BOARD STATE /////////////

  private sendFromQueue() {
    let element = this.messageQueue[this.messageQueue.length - 1];
    var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd'))
      .contentWindow;
    chessBoard.postMessage(element, environment.urls.chessClientURL);
  }

  ///////////// Creating a New Game , based on Position ///////////////
  public newGameInit(FEN: string) {
    this.color = 'white';
    this.currentFEN = FEN;
    this.prevFEN = this.currentFEN;

    if (this.isReady) {
      console.log('Game in It Ready' + this.isReady);
      var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd'))
        .contentWindow;
      chessBoard.postMessage(
        JSON.stringify({
          boardState: this.currentFEN,
          color: this.color,
          lessonFlag: true,
        }),
        environment.urls.chessClientURL
      );
    } else {
      this.messageQueue.push(this.currentFEN);
    }
  }
}
