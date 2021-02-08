import { Component, OnInit } from '@angular/core';
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

  constructor() {}
  postion1() {
    this.newGameInit('7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1');
  }
  postion2() {
    this.newGameInit('3p3p/2p2p2/8/2p3p1/4R3/1p3pp1/8/3p3R w - - 0 1');
  }
  postion3() {
    this.newGameInit('8/2p2p2/8/2p5/4Q3/1p3pp1/8/8 w - - 0 1');
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
        // Means that there is the board state and whatnot
        console.log('CURENET FEN !!!!!!' + e.data);

        this.prevFEN = this.currentFEN;
        let info: string = e.data;

        if (info.length > 20)
          info = info.substr(0, info.length - 9) + 'w k - 0 1';

        if (info == 'ReadyToRecieve') {
          this.isReady = true;

          this.sendFromQueue();
        } else if (info == 'checkmate') {
          console.log(info);
          this.httpGetAsync(
            `${environment.urls.stockFishURL}/?level=${this.level}&fen=${this.currentFEN}`,
            (response) => {
              if (this.isReady) {
                var chessBoard = (<HTMLFrameElement>(
                  document.getElementById('chessBd')
                )).contentWindow;
                chessBoard.postMessage(
                  JSON.stringify({
                    boardState: info,
                    color: this.color,
                    lessonFlag: true,
                  }),
                  environment.urls.chessClientURL
                );
              } else {
                this.messageQueue.push(
                  JSON.stringify({
                    boardState: info,
                    color: this.color,
                    lessonFlag: true,
                  })
                );
              }
              this.currentFEN = response;
            }
          );
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
