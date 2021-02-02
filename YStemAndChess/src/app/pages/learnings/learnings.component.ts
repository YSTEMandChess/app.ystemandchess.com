import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/socket.service';
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
  private currentFEN: String = '3qkbnr/3ppppp/8/8/8/8/8/6QN w k - 0 1';
  private prevFEN: String = this.currentFEN;

  constructor() {}
  postion1() {
    this.newGameInit('7R/8/8/4p3/p7/3p4/8/k6K w k - 0 1');
  }
  postion2() {
    this.newGameInit('3qkbnR/3ppppp/8/8/8/8/6PP/6KN w k - 0 1');
  }
  postion3() {
    this.newGameInit('3qknnr/3ppppp/7k/8/7k/8/6PP/6KN w k - 0 1');
  }

  ngOnInit(): void {
    var eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';

    this.newGameInit('3qkbnr/3ppppp/8/8/8/8/8/6KN w k - 0 1');

    // Listen to message from child window
    eventer(
      messageEvent,
      (e) => {
        // Means that there is the board state and whatnot

        this.prevFEN = this.currentFEN;
        let info: string = e.data;
        if (info.length > 20)
          info = info.substr(0, info.length - 9) + 'w k - 0 1';
        console.log('DATAAAAAAAAAAAAAAAAAAAAAAA');
        console.log(info);
        //console.log("I am info " + info);
        if (info == 'ReadyToRecieve') {
          this.isReady = true;
          this.sendFromQueue();
        } else {
          console.log('ELSEEEEEEEEEE');
          this.currentFEN = info;

          if (this.level <= 1) this.level = 1;
          else if (this.level >= 30) this.level = 30;
          this.httpGetAsync(
            `${environment.urls.stockFishURL}/?level=${this.level}&fen=${this.currentFEN}`,
            (response) => {
              if (this.isReady) {
                console.log('IS READYYYYYYY');
                response = this.currentFEN;
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
                console.log('IS NOOOOOOOOOOT READYYYYYYY');

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

  public newGameInit(FEN: string) {
    this.color = 'white';
    console.log('COLORRRRRRRRRR' + this.color);
    this.currentFEN = FEN;
    this.prevFEN = this.currentFEN;

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
      callback(xmlHttp.responseText);
    };
    xmlHttp.open('POST', theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }

  private gameOverAlert() {
    alert('Game over.');
  }
}
