import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pawn-lessons',
  templateUrl: './pawn-lessons.component.html',
  styleUrls: ['./pawn-lessons.component.scss']
})
export class PawnLessonsComponent implements OnInit {

  private lessonStartFEN: string = "";
  private lessonEndFEN: string = "";
  private lessonStarted: boolean = false;
  private endSquare: string = "";
  private lessonNum = "";
  private boardState = "";
  private currentFEN = "";
  private messageQueue = new Array();
  private color = "white";
  private level = 5;
  private isReady = false;
  public displayLessonNum = 0;

  constructor(private cookie: CookieService) { }

  async ngOnInit() {
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

    // Listen to message from child window
    eventer(messageEvent, async (e) => {
      console.log("the end FEN " + this.lessonEndFEN);
      if (e.origin == "http://localhost") {
        if(e.data == "ReadyToRecieve") {
          this.isReady = true;
          this.sendFromQueue();
        }
        if(this.lessonStarted == false) {
          await this.getLessonsCompleted()
          this.lessonStarted = true;
        } 
        else if(e.data == this.lessonEndFEN) {
          this.updateLessonCompletion();
          alert("Lesson " + this.displayLessonNum + " completed!");
          await this.getLessonsCompleted();
        } else {
          this.currentFEN = e.data;
          this.level = 5;
          if(this.level <= 1) this.level = 1;
          else if (this.level >= 30) this.level = 30;
          console.log(e.data)
          this.httpGetAsync(`http://127.0.0.1:8080/?level=${this.level}&fen=${this.currentFEN}`, (response) => {
            if (this.isReady) {
              console.log("sending message " + JSON.stringify({ boardState: response, color: this.color }));
              var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd')).contentWindow;
              chessBoard.postMessage(JSON.stringify({ boardState: response, color: this.color }), "http://localhost");
            } else {
              this.messageQueue.push(JSON.stringify({ boardState: response, color: this.color }));
            }
          });
        }
      }
    }, false);
  }

  private async getLessonsCompleted() {
    let url = `http://127.0.0.1:8000/getCompletedLesson.php/?jwt=${this.cookie.get('login')}&piece=pawn`;
      this.httpGetAsync(url, (response) => {
      let data = JSON.parse(response);
      this.lessonNum = data;
      this.getCurrentLesson();
    });
  }

  private async getCurrentLesson() {
    let url = `http://127.0.0.1:8000/getLesson.php/?jwt=${this.cookie.get('login')}&piece=pawn&lessonNumber=${this.lessonNum}`;
    console.log("I am lesson Num " + this.lessonNum);
    this.httpGetAsync(url, (response) => {
      let data = JSON.parse(response);
      this.lessonStartFEN = data['startFen'];
      this.lessonEndFEN = data['endFen'];
      this.displayLessonNum = data['lessonNumber'];
      console.log("I am display Lesson " + this.displayLessonNum)
      this.endSquare = data['endSquare'];
      this.sendLessonToChessBoard();
    });
  }

  private sendFromQueue() {
    this.messageQueue.forEach(element => {
      console.log("sending message " + element);
      var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd')).contentWindow;
      chessBoard.postMessage(element, "http://localhost");
    });
  }

  public newGameInit() {
    console.log("A new game has been requested")
    this.currentFEN = this.lessonStartFEN;
    
    if (this.isReady) {
      console.log("sending message" + this.currentFEN);
      var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd')).contentWindow;
      chessBoard.postMessage(JSON.stringify({ boardState: this.currentFEN, color: this.color }), "http://localhost");
    } else {
      this.messageQueue.push(JSON.stringify({ boardState: this.currentFEN, color: this.color }));
    }
    
    if (this.color == "white") {
      this.level = 5;
      this.color = "black";
      if(this.level <= 1) this.level = 1;
      else if (this.level >= 30) this.level = 30;
      this.httpGetAsync(`http://127.0.0.1:8080/?level=${this.level}&fen=${this.currentFEN}`, (response) => {
        if (this.isReady) {
          console.log("sending message" + response);
          var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd')).contentWindow;
          chessBoard.postMessage(JSON.stringify({ boardState: response, color: this.color }), "http://localhost");
        } else {
          this.messageQueue.push(JSON.stringify({ boardState: response, color: this.color }));
        }
      });
    } 
  }

  private sendLessonToChessBoard() {
    var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd')).contentWindow;
    console.log("start " + this.lessonStartFEN);
    console.log("end " + this.lessonEndFEN);
    chessBoard.postMessage(JSON.stringify({ boardState: this.lessonStartFEN, endState: this.lessonEndFEN, lessonFlag: true, endSquare: this.endSquare, color: this.color }), "http://localhost");
  }

  private async updateLessonCompletion() {
    let url = `http://127.0.0.1:8000/updateLessonCompletion.php/?jwt=${this.cookie.get("login")}&piece=pawn&lessonNumber=${this.lessonNum}`;
    this.httpGetAsync(url, (response) => {
      console.log(response);
    });
  }

  private nextLesson() {
    this.ngOnInit();
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

}
