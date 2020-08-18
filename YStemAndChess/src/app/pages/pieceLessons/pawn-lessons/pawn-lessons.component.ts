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
  private currentFEN = "";
  private messageQueue = new Array();
  private color = "white";
  private level = 5; //default stockfish value
  private isReady = false;
  public displayLessonNum = 0;

  constructor(private cookie: CookieService) { }

  async ngOnInit() {
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

    // Listen to message from child window
    eventer(messageEvent, async (e) => {
      if (e.origin == "http://localhost") {
        //child window has loaded and can now recieve data
        if(e.data == "ReadyToRecieve") {
          this.isReady = true;
          this.sendFromQueue();
        }
        //gets the amount of lessons completed if not in lesson
        if(this.lessonStarted == false) {
          await this.getLessonsCompleted()
          this.lessonStarted = true;
        } 
        //if lesson is completed start new lesson
        else if(e.data == this.lessonEndFEN) {
          this.updateLessonCompletion();
          alert("Lesson " + this.displayLessonNum + " completed!");
          await this.getLessonsCompleted();
          window.location.reload();
        } else {
          //stockfish move
          this.currentFEN = e.data;
          this.level = 5;
          if(this.level <= 1) this.level = 1;
          else if (this.level >= 30) this.level = 30;
          this.httpGetAsync(`http://127.0.0.1:8080/?level=${this.level}&fen=${this.currentFEN}`, (response) => {
            if (this.isReady) {
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

  /**
   * get the last lesson completed by the student for the pawn
   */
  private async getLessonsCompleted() {
    let url = `http://127.0.0.1:8000/getCompletedLesson.php/?jwt=${this.cookie.get('login')}&piece=pawn`;
      this.httpGetAsync(url, (response) => {
      let data = JSON.parse(response);
      this.lessonNum = data;
      this.getCurrentLesson();
    });
  }

  /**
   * get current lesson data
   */
  private async getCurrentLesson() {
    let url = `http://127.0.0.1:8000/getLesson.php/?jwt=${this.cookie.get('login')}&piece=pawn&lessonNumber=${this.lessonNum}`;
    console.log("I am lesson Num " + this.lessonNum);
    this.httpGetAsync(url, (response) => {
      let data = JSON.parse(response);
      this.lessonStartFEN = data['startFen'];
      this.lessonEndFEN = data['endFen'];
      this.displayLessonNum = data['lessonNumber'];
      if(this.checkIfLessonsAreCompleted() === true) { return; }
      this.endSquare = data['endSquare'];
      this.sendLessonToChessBoard();
    });
  }

  /**
   * checks if all lessons for the pawn have been completed
   */
  private checkIfLessonsAreCompleted(): boolean {
    let completed: boolean = false;
    if(this.displayLessonNum === undefined) {
      alert("Congratulations all current lessons for this piece have been completed!" + '\n' +
        "Comeback soon for more lessons or go over previous lessons.");
        completed = true;
    }
    return completed;
  }

  /**
   * store data for chess board before it has loaded
   */
  private sendFromQueue() {
    this.messageQueue.forEach(element => {
      console.log("sending message " + element);
      var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd')).contentWindow;
      chessBoard.postMessage(element, "http://localhost");
    });
  }

  /**
   * initialize stockfish
   */
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

  /**
   * send current lesson to chess board
   */
  private sendLessonToChessBoard() {
    var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd')).contentWindow;
    console.log("start " + this.lessonStartFEN);
    console.log("end " + this.lessonEndFEN);
    chessBoard.postMessage(JSON.stringify({ boardState: this.lessonStartFEN, endState: this.lessonEndFEN, lessonFlag: true, endSquare: this.endSquare, color: this.color }), "http://localhost");
  }

  public previousLesson() {
    
  }

  /**
   * update student lesson completion for database
   */
  private async updateLessonCompletion() {
    let url = `http://127.0.0.1:8000/updateLessonCompletion.php/?jwt=${this.cookie.get("login")}&piece=pawn&lessonNumber=${this.lessonNum}`;
    this.httpGetAsync(url, (response) => {
      console.log(response);
    });
  }

  /**
   * make requests to the serer
   * @param theUrl url to contact
   * @param callback response
   */
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
