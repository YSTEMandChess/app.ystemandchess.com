import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { setPermissionLevel } from '../../globals';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-student-recordings',
  templateUrl: './student-recordings.component.html',
  styleUrls: ['./student-recordings.component.scss'],
})
export class StudentRecordingsComponent implements OnInit {
  public recordings = new Map();
  public studentName: string = '';

  constructor(private cookie: CookieService) {}

  async ngOnInit() {
    let pLevel = 'nLogged';
    let uInfo = await setPermissionLevel(this.cookie);
    if (uInfo['error'] == undefined) {
      pLevel = uInfo['role'];
      this.studentName = uInfo['username'];
    }
    if (this.cookie.check('student')) {
      this.studentName = this.cookie.get('student');
    } else {
    }
    this.getRecordings();
  }

  private getRecordings() {
    let url = `${environment.urls.middlewareURL}/meetings/parents/recordings/?childUsername=${this.studentName}`;
    this.httpGetAsync(url, 'GET', (response) => {
      let data = JSON.parse(response);
      data.map((recording) => {
        let recordingDate: string = this.getRecordingString(
          recording.meetingStartTime
        );
        let newArr = [];
        if (this.recordings.has(recordingDate)) {
          newArr = this.recordings.get(recordingDate);
        } else {
          newArr = newArr.concat(recording.filesList);
        }
        this.recordings.set(recordingDate, newArr);
      });
    });
  }

  private getRecordingString(recordingDate: Date) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    if (recordingDate) {
      let dateString = new Date(recordingDate);
      return `${
        monthNames[dateString.getMonth()]
      } ${dateString.getDate()}, ${dateString.getFullYear()}`;
    }
    return null;
  }

  public verify(fileName) {
    let url = `${environment.urls.middlewareURL}/meetings/singleRecording/?filename=${fileName}`;
    this.httpGetAsync(url, 'GET', (response) => {
      if (confirm('Download now?')) {
        window.open(JSON.parse(response));
      }
    });
  }

  private httpGetAsync(theUrl: string, method: string, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open(method, theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader(
      'Authorization',
      `Bearer ${this.cookie.get('login')}`
    );
    xmlHttp.send(null);
  }
}
