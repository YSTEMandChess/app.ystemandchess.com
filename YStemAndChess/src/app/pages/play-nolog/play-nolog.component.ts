import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-nolog',
  templateUrl: './play-nolog.component.html',
  styleUrls: ['./play-nolog.component.scss']
})
export class PlayNologComponent implements OnInit {
  
  private messageQueue = new Array();
  private isReady: boolean;
  private color:String;
  private level:number = 3;
  private currentFEN:String = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  constructor() { }

  ngOnInit(): void {
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    
    this.newGameInit();

    // Listen to message from child window
    eventer(messageEvent, (e) => {
      if (e.origin == "http://localhost") {
        // Means that there is the board state and whatnot
        console.log("this does work every time");
        let info = e.data;
        console.log("I am info " + info);
        if(info == "ReadyToRecieve") {
          this.isReady=true;
          this.sendFromQueue();
        } else if(info == "checkmate") {
          this.gameOverAlert();
        } else if(info == "draw") {
          this.gameOverAlert();
        } else if(info == "gameOver") {
          this.gameOverAlert();
        } else {
          this.currentFEN = info;
          this.httpGetAsync(`http://127.0.0.1:8080/?level=${this.level}&fen=${this.currentFEN}`, (response) => {
            if (this.isReady) {
              console.log("sending message "+ JSON.stringify({ boardState: response, color: this.color }));
              var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd')).contentWindow;
              chessBoard.postMessage(JSON.stringify({ boardState: response, color: this.color }), "http://localhost");
            } else  {
              this.messageQueue.push(JSON.stringify({ boardState: response, color: this.color }));
            }
          });
        }
      }
    }, false);
  }
  
  private sendFromQueue() {
    this.messageQueue.forEach(element => {
      console.log("sending message " +element);
      var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd')).contentWindow;
      chessBoard.postMessage(element, "http://localhost");
    });
  }

  public newGameInit() {
    this.color = (Math.random() > .5) ? "white" : "black";
    if (this.color == "black") {
      this.httpGetAsync(`http://127.0.0.1:8080/?level=${this.level}&fen=${this.currentFEN}`, (response) => {
        if (this.isReady) {
          console.log("sending message" + response);
          var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd')).contentWindow;
          chessBoard.postMessage(JSON.stringify({ boardState: response, color: this.color }), "http://localhost");
        } else  {
          this.messageQueue.push(JSON.stringify({ boardState: response, color: this.color }));
        }
      });
    }
  }

  private httpGetAsync(theUrl: string, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
  }

  private gameOverAlert() {
    alert("Game over.")
  }

}
