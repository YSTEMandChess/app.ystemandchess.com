import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { setPermissionLevel } from '../../globals';
import { HeaderComponent } from '../../header/header.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-parent-add-student',
  templateUrl: './parent-add-student.component.html',
  styleUrls: ['./parent-add-student.component.scss'],
})
export class ParentAddStudentComponent implements OnInit {
  link: string = null;
  private studentIndex: number = 0;
  numStudents = new Array();
  private newStudents: Student[] = [];
  newStudentFlag: boolean = false;
  private logged;
  username;
  private parentUser: string = '';
  private studentFirstNameFlag: boolean = false;
  private studentLastNameFlag: boolean = false;
  private studentUserNameFlag: boolean = false;
  private studentEmailFlag: boolean = false;
  private studentPasswordFlag: boolean = false;
  private studentRetypeFlag: boolean = false;
  numNewStudents: number = 0;

  constructor(private cookie: CookieService, private head: HeaderComponent) {}

  async ngOnInit() {
    this.numStudents.push(0);
    this.numNewStudents++;
    let pLevel = 'nLogged';
    let uInfo = await setPermissionLevel(this.cookie);
    if (uInfo['error'] == undefined) {
      this.logged = true;
      pLevel = uInfo.role;
      this.username = uInfo.username;
    }
  }

  studentFirstNameVerification(firstName: any, index: any): boolean {
    firstName = this.allowTesting(firstName, 'studentFirstName' + index);

    if (/^[A-Za-z]{2,15}$/.test(firstName)) {
      this.studentFirstNameFlag = true;
      document.getElementById('errorFirstName' + index).innerHTML = '';
      return true;
    } else {
      this.studentFirstNameFlag = false;
      document.getElementById('errorFirstName' + index).innerHTML =
        'Invalid First Name';
      return false;
    }
  }

  studentLastNameVerification(lastName: any, index: any): boolean {
    lastName = this.allowTesting(lastName, 'studentLastName' + index);

    if (/^[A-Za-z]{2,15}$/.test(lastName)) {
      this.studentLastNameFlag = true;
      document.getElementById('errorLastName' + index).innerHTML = '';
      return true;
    } else {
      this.studentLastNameFlag = false;
      document.getElementById('errorLastName' + index).innerHTML =
        'Invalid Last Name';
      return false;
    }
  }

  studentUsernameVerification(username: any, index: any): boolean {
    username = this.allowTesting(username, 'studentUsername' + index);

    if (/^[a-zA-Z](\S){1,14}$/.test(username)) {
      //check username against database
      this.studentUserNameFlag = true;
      document.getElementById('errorUsername' + index).innerHTML = '';
      return true;
    } else {
      this.studentUserNameFlag = false;
      document.getElementById('errorUsername' + index).innerHTML =
        'Invalid Username';
      return false;
    }
  }

  studentEmailVerification(email: any, index: any): boolean {
    email = this.allowTesting(email, 'studentEmail' + index);

    if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(email)) {
      this.studentEmailFlag = true;
      document.getElementById('errorEmail' + index).innerHTML = '';
      return true;
    } else {
      this.studentEmailFlag = false;
      document.getElementById('errorEmail' + index).innerHTML = 'Invalid Email';
      return false;
    }
  }

  studentPasswordVerification(password: any, index: any): boolean {
    password = this.allowTesting(password, 'studentPassword' + index);

    if (password.length < 8) {
      this.studentPasswordFlag = false;
      document.getElementById('errorPassword' + index).innerHTML =
        'Invalid Password';
      return false;
    } else {
      //verify password with username
      this.studentPasswordFlag = true;
      document.getElementById('errorPassword' + index).innerHTML = '';
      return true;
    }
  }

  studentRetypePasswordVerification(
    retypedPassword: any,
    password: any,
    index: any
  ): boolean {
    retypedPassword = this.allowTesting(
      retypedPassword,
      'studentRetypedPassword' + index
    );
    password = this.allowTesting(password, 'studentPassword' + index);

    if (retypedPassword === password) {
      this.studentRetypeFlag = true;
      document.getElementById('errorRetype' + index).innerHTML = '';
      return true;
    } else {
      this.studentRetypeFlag = false;
      document.getElementById('errorRetype' + index).innerHTML =
        'Passwords do not match';
      return false;
    }
  }

  ifValidStudentAccount(index): boolean {
    this.studentIndex = index;
    if (
      this.studentFirstNameFlag === true &&
      this.studentLastNameFlag === true &&
      this.studentUserNameFlag === true &&
      this.studentEmailFlag === true &&
      this.studentPasswordFlag === true &&
      this.studentRetypeFlag === true
    ) {
      this.link = '/login';
      this.newStudents.push(this.addStudentToArray(index));
      //set them all to false for future students
      this.resetStudentFlags();
      return true;
    } else {
      this.link = null;
      return false;
    }
  }

  private resetStudentFlags(): void {
    this.studentFirstNameFlag = false;
    this.studentLastNameFlag = false;
    this.studentUserNameFlag = false;
    this.studentEmailFlag = false;
    this.studentPasswordFlag = false;
    this.studentRetypeFlag = false;
  }

  private addStudentToArray(index): Student {
    var studentFirstName = (<HTMLInputElement>(
      document.getElementById('studentFirstName' + index)
    )).value;
    var studentLastName = (<HTMLInputElement>(
      document.getElementById('studentLastName' + index)
    )).value;
    var studentUserName = (<HTMLInputElement>(
      document.getElementById('studentUsername' + index)
    )).value;
    var studentEmail = (<HTMLInputElement>(
      document.getElementById('studentEmail' + index)
    )).value;
    var studentPasssword = (<HTMLInputElement>(
      document.getElementById('studentPassword' + index)
    )).value;

    let student: Student = {
      first: studentFirstName,
      last: studentLastName,
      username: studentUserName,
      email: studentEmail,
      password: studentPasssword,
    };
    return student;
  }

  removeNewStudent(click, index): void {
    if (click == event) {
      if (this.numNewStudents == 1) {
        this.newStudentFlag = false;
        this.numStudents = [];
        this.numNewStudents = 0;
        this.newStudents = [];
        document.getElementById('plus' + index).style.display = 'inline';
        document.getElementById('x').style.display = 'none';
        return;
      } else {
        document.getElementById('newStudent' + index).style.display = 'none';
        let previous;
        if (index != 0) {
          previous = index - 1;
        } else {
          previous = index;
        }
        document.getElementById('plus' + previous).style.display = 'inline';
        this.newStudents[index] = null;
      }
    }
    this.numNewStudents--;
  }

  addNewStudentForm(click, index): void {
    if (click == event) {
      this.numStudents.push(index);
      document.getElementById('plus' + index).style.display = 'none';
    }
    this.numNewStudents++;
  }

  students() {
    return this.numStudents;
  }

  clearNulls(arr: any[]) {
    let newarr = [];
    let index = 0;
    while (index < arr.length) {
      if (arr[index] != null) {
        newarr.push(arr[index]);
      }
      index++;
    }
    return newarr;
  }

  SendToDataBase() {
    if (this.ifValidStudentAccount(this.studentIndex)) {
      return;
    }

    let url: string = '';

    this.newStudents = this.clearNulls(this.newStudents);
    let index = 0;
    this.parentUser = this.username;

    while (index < this.newStudents.length) {
      let firstName: string = this.newStudents[index].first;
      let lastName: string = this.newStudents[index].last;
      let userName: string = this.newStudents[index].username;
      let email: string = this.newStudents[index].email;
      let password: string = this.newStudents[index].password;

      url = `${environment.urls.middlewareURL}/user/children?first=${firstName}&last=${lastName}&username=${userName}&email=${email}&password=${password}`;

      this.httpGetAsync(url, 'POST', (response) => {
        if (
          JSON.parse(response) ===
          'This username has been taken. Please choose another.'
        ) {
          this.link = '/parent-add-student';
        }
      });
      index++;
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

  private allowTesting(userParameter: any, HtmlId: any) {
    if (userParameter == event) {
      return (userParameter = (<HTMLInputElement>(
        document.getElementById(HtmlId)
      )).value);
    }
    return userParameter;
  }
}

export interface Student {
  first: string;
  last: string;
  username: string;
  email: string;
  password: string;
}
