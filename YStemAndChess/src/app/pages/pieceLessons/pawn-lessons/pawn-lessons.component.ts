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
  public displayLessonNum = 0;

  constructor(private cookie: CookieService) { }

  async ngOnInit() {
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

    // Listen to message from child window
    eventer(messageEvent, (e) => {
      console.log("the end FEN " + this.lessonEndFEN);
      if (e.origin == "http://localhost") {
        if(this.lessonStarted == false) {
          this.getLessonsCompleted()
          this.getCurrentLesson();
          this.lessonStarted = true;
        } 
        if(e.data == this.lessonEndFEN) {
          alert("Lesson " + this.displayLessonNum + " completed!");
        }
      }
    }, false);
  }

  private getLessonsCompleted() {
    let url = `http://127.0.0.1:8000/getCompletedLesson.php/?jwt=${this.cookie.get('login')}&piece=pawn`;
      this.httpGetAsync(url, (response) => {
      let data = JSON.parse(response);
      this.lessonNum = data["lessonNumber"];
    });
  }

  private getCurrentLesson() {
    let url = `http://127.0.0.1:8000/getLesson.php/?jwt=${this.cookie.get('login')}&piece=pawn`;
    this.httpGetAsync(url, (response) => {
      let data = JSON.parse(response);
      this.lessonStartFEN = data['startFen'];
      this.lessonEndFEN = data['endFen'];
      this.displayLessonNum = data['lessonNumber'];
      this.endSquare = data['endSquare'];
      this.sendLessonToChessBoard();
    });
  }

  private sendLessonToChessBoard() {
    var chessBoard = (<HTMLFrameElement>document.getElementById('chessBd')).contentWindow;
    console.log("start " + this.lessonStartFEN);
    console.log("end " + this.lessonEndFEN);
    chessBoard.postMessage(JSON.stringify({ boardState: this.lessonStartFEN, endState: this.lessonEndFEN, lessonFlag: true, endSquare: this.endSquare }), "http://localhost");
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
