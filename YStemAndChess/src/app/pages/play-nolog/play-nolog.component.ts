import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-play-nolog',
  templateUrl: './play-nolog.component.html',
  styleUrls: ['./play-nolog.component.scss'],
})
export class PlayNologComponent implements OnInit {
  private messageQueue = new Array();
  private isReady: boolean;
  private color: String = 'white';
  private level: number = 5;
  private currentFEN: String =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  private prevFEN: String = this.currentFEN;

  constructor() {}

  ngOnInit(): void {
    var eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';

    this.newGameInit();

    // Listen to message from child window
    eventer(
      messageEvent,
      (e) => {
        // Means that there is the board state and whatnot
        console.log('this does work every time');
        this.prevFEN = this.currentFEN;
        let info = e.data;
        //console.log("I am info " + info);
        if (info == 'ReadyToRecieve') {
          this.isReady = true;
          this.sendFromQueue();
        } else if (info == 'checkmate') {
          this.gameOverAlert();
        } else if (info == 'draw') {
          this.gameOverAlert();
        } else if (info == 'gameOver') {
          this.gameOverAlert();
        } else if (typeof info !== 'object') {
          this.currentFEN = info;
          this.level = parseInt(
            (<HTMLInputElement>document.getElementById('movesAhead')).value
          );
          if (this.level <= 1) this.level = 1;
          else if (this.level >= 30) this.level = 30;
          this.httpGetAsync(
            `${environment.urls.stockFishURL}/?level=${this.level}&fen=${this.currentFEN}`,
            (response) => {
              if (this.isReady) {
                console.log(
                  'sending message ' +
                    JSON.stringify({ boardState: response, color: this.color })
                );
                var chessBoard = (<HTMLFrameElement>(
                  document.getElementById('chessBd')
                )).contentWindow;
                chessBoard.postMessage(
                  JSON.stringify({ boardState: response, color: this.color }),
                  environment.urls.chessClientURL
                );
              } else {
                this.messageQueue.push(
                  JSON.stringify({ boardState: response, color: this.color })
                );
              }
              this.currentFEN = response;
            }
          );
          console.log(
            'Curr FEN: ' + this.currentFEN + '     Prev FEN: ' + this.prevFEN
          );
        }
      },
      false
    );
  }

  private sendFromQueue() {
    this.messageQueue.forEach((element) => {
      console.log('sending message ' + element);
      var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd'))
        .contentWindow;
      chessBoard.postMessage(element, environment.urls.chessClientURL);
    });
  }

  public newGameInit() {
    this.color = Math.random() > 0.5 ? 'white' : 'black';
    this.currentFEN =
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    this.prevFEN = this.currentFEN;
    var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd'))
      .contentWindow;

    if (this.isReady) {
      var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd'))
        .contentWindow;
      chessBoard.postMessage(
        JSON.stringify({ boardState: this.currentFEN, color: this.color }),
        environment.urls.chessClientURL
      );
    } else {
      this.messageQueue.push(
        JSON.stringify({ boardState: this.currentFEN, color: this.color })
      );
    }

    if (this.color === 'black') {
      this.level = parseInt(
        (<HTMLInputElement>document.getElementById('movesAhead')).value
      );
      if (this.level <= 1) this.level = 1;
      else if (this.level >= 10) this.level = 10;
      this.httpGetAsync(
        `/chessclient/?level=${this.level}&fen=${this.currentFEN}`,
        (response) => {
          if (this.isReady) {
            var chessBoard = (<HTMLFrameElement>(
              document.getElementById('chessBd')
            )).contentWindow;
            chessBoard.postMessage(
              JSON.stringify({ boardState: response, color: this.color }),
              environment.urls.chessClientURL
            );
          } else {
            this.messageQueue.push(
              JSON.stringify({ boardState: response, color: this.color })
            );
          }
        }
      );
      this.httpGetAsync(
        `${environment.urls.stockFishURL}/?level=${this.level}&fen=${this.currentFEN}`,
        (response) => {
          if (this.isReady) {
            var chessBoard = (<HTMLFrameElement>(
              document.getElementById('chessBd')
            )).contentWindow;
            chessBoard.postMessage(
              JSON.stringify({ boardState: response, color: this.color }),
              environment.urls.chessClientURL
            );
          } else {
            this.messageQueue.push(
              JSON.stringify({ boardState: response, color: this.color })
            );
          }
        }
      );
    }
  }

  public undoPrevMove() {
    var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd'))
      .contentWindow;
    this.currentFEN = this.prevFEN;
    if (this.color === 'white')
      chessBoard.postMessage(
        JSON.stringify({ boardState: this.currentFEN, color: this.color }),
        environment.urls.chessClientURL
      );
    if (this.color === 'black') {
      this.httpGetAsync(
        `/chessclient/?level=${this.level}&fen=${this.currentFEN}`,
        (response) => {
          if (this.isReady) {
            var chessBoard = (<HTMLFrameElement>(
              document.getElementById('chessBd')
            )).contentWindow;
            chessBoard.postMessage(
              JSON.stringify({ boardState: response, color: this.color }),
              environment.urls.chessClientURL
            );
          } else {
            this.messageQueue.push(
              JSON.stringify({ boardState: response, color: this.color })
            );
          }
        }
      );
      this.httpGetAsync(
        `${environment.urls.stockFishURL}/?level=${this.level}&fen=${this.currentFEN}`,
        (response) => {
          if (this.isReady) {
            var chessBoard = (<HTMLFrameElement>(
              document.getElementById('chessBd')
            )).contentWindow;
            chessBoard.postMessage(
              JSON.stringify({ boardState: response, color: this.color }),
              environment.urls.chessClientURL
            );
          } else {
            this.messageQueue.push(
              JSON.stringify({ boardState: response, color: this.color })
            );
          }
        }
      );
    }
  }

  private httpGetAsync(theUrl: string, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      console.log(xmlHttp.readyState, xmlHttp.status);
      console.log('/////////////////////////////////////////');
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open('POST', theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }

  private gameOverAlert() {
    alert('Game over.');
  }
}
