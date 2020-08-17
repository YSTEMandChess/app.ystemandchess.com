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
  public lessonNum: string = "";

  constructor(private cookie: CookieService) { }

  async ngOnInit() {
    this.getLessonsCompleted();
    this.getCurrentLesson();
  }

  private getLessonsCompleted() {
    let url = `http://127.0.0.1/getCompletedLesson.php/?jwt=${this.cookie.get('login')}&piece=pawn`;
    this.httpGetAsync(url, (response) => {
      let data = JSON.parse(response);
      this.lessonNum = data["lessonNumber"];
    });
  }

  private getCurrentLesson() {
    let url = `http://127.0.0.1/getLesson.php/?jwt=${this.cookie.get('login')}&piece=pawn`;
    this.httpGetAsync(url, (response) => {
      let data = JSON.parse(response);
      this.lessonStartFEN = data['startFen'];
      this.lessonEndFEN = data['endFen'];
    })
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
