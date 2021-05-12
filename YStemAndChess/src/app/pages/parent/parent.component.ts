import { Component, OnInit } from '@angular/core';
import { setPermissionLevel } from '../../globals';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent implements OnInit {
  username: string;
  private logged: boolean;
  students: string[] = [];
  times: string[] = [];

  constructor(private cookie: CookieService) {}

  ngOnInit() {
    this.getUsername();
    this.getStudents();
  }

  getStudents() {
    let url = `${environment.urls.middlewareURL}/user/children`;
    this.httpGetAsync(url, 'GET', (response) => {
      if (response == 'This username has been taken. Please choose another.') {
        alert('username has been taken');
      }
      let data = JSON.parse(response);
      data.map((student) => {
        this.students.push(student.username);
        this.times.push(student.timePlayed);
      });
    });
  }

  public getStudentInfo(index) {
    this.cookie.set('student', this.students[index]);
  }

  private async getUsername() {
    let pLevel = 'nLogged';
    let uInfo = await setPermissionLevel(this.cookie);
    if (uInfo['error'] == undefined) {
      this.logged = true;
      pLevel = uInfo['role'];
      this.username = uInfo['username'];
    }
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
