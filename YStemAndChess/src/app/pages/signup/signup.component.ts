import { Component, OnInit } from '@angular/core';
import { createAotUrlResolver } from '@angular/compiler';
import { isString } from 'util';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystringify';
import { environment } from 'src/environments/environment';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  //account with no students
  link: string = null;
  private firstNameFlag: boolean = false;
  private lastNameFlag: boolean = false;
  private emailFlag: boolean = false;
  private userNameFlag: boolean = false;
  private passwordFlag: boolean = false;
  private retypeFlag: boolean = false;
  firstNameError: string = '';
  lastNameError: string = '';
  emailError: string = '';
  userNameError: string = '';
  passwordError: string = '';
  retypePasswordError: string = '';

  //parent account with students
  private parentAccountFlag: boolean = false;
  numStudents = new Array();
  private newStudents: Student[] = [];
  newStudentFlag: boolean = false;
  private studentFirstNameFlag: boolean = false;
  private studentLastNameFlag: boolean = false;
  private studentUserNameFlag: boolean = false;
  private studentPasswordFlag: boolean = false;
  private studentRetypeFlag: boolean = false;
  private studentEmailFlag: boolean = true;
  private numNewStudents: number = 0;

  //http is for testing
  constructor(private http: HttpClient) {}

  // Regex to match firstName with spaces
  private firstNameVerificationREGEX = /^[A-Za-z ]{2,15}$/;

  ngOnInit(): void {}

  firstNameVerification(firstName: any): boolean {
    firstName = this.allowTesting(firstName, 'firstName');

    if (this.firstNameVerificationREGEX.test(firstName)) {
      this.firstNameFlag = true;
      this.firstNameError = '';
      return true;
    } else {
      this.firstNameFlag = false;
      this.firstNameError = 'Invalid First Name';
      return false;
    }
  }

  studentFirstNameVerification(firstName: any, index: any): boolean {
    firstName = this.allowTesting(firstName, 'studentFirstName' + index);

    if (this.firstNameVerificationREGEX.test(firstName)) {
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

  lastNameVerification(lastName: any): boolean {
    lastName = this.allowTesting(lastName, 'lastName');

    if (/^[A-Za-z]{2,15}$/.test(lastName)) {
      this.lastNameFlag = true;
      this.lastNameError = '';
      return true;
    } else {
      this.lastNameFlag = false;
      this.lastNameError = 'Invalid Last Name';
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

  emailVerification(email: any): boolean {
    email = this.allowTesting(email, 'email');

    if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(email)) {
      this.emailFlag = true;
      this.emailError = '';
      return true;
    } else {
      this.emailFlag = false;
      this.emailError = 'Invalid Email';
      return false;
    }
  }

  usernameVerification(username: any): boolean {
    username = this.allowTesting(username, 'username');

    if (/^[a-zA-Z](\S){1,14}$/.test(username)) {
      //check username against database
      this.userNameFlag = true;
      this.userNameError = '';
      return true;
    } else {
      this.userNameFlag = false;
      this.userNameError = 'Invalid Username';
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

  passwordVerification(password: any): boolean {
    password = this.allowTesting(password, 'password');

    if (password.length < 8) {
      this.passwordFlag = false;
      this.passwordError = 'Invalid Password';
      return false;
    } else {
      //verify password with username
      this.passwordFlag = true;
      this.passwordError = '';
      return true;
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

  retypePasswordVerification(retypedPassword: any, password: any): boolean {
    retypedPassword = this.allowTesting(retypedPassword, 'retypedPassword');
    password = this.allowTesting(password, 'password');

    if (retypedPassword === password) {
      this.retypeFlag = true;
      this.retypePasswordError = '';
      return true;
    } else {
      this.retypeFlag = false;
      this.retypePasswordError = 'Passwords do not match';
      return false;
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

  checkIfValidAccount(): boolean {
    if (
      this.firstNameFlag === true &&
      this.lastNameFlag === true &&
      this.emailFlag === true &&
      this.userNameFlag === true &&
      this.passwordFlag === true &&
      this.retypeFlag === true
    ) {
      this.link = '/login';
      return true;
    } else {
      this.link = null;
      return false;
    }
  }

  ifValidStudentAccount(click, index): void {
    if (
      this.studentFirstNameFlag === true &&
      this.studentLastNameFlag === true &&
      this.studentUserNameFlag === true &&
      this.studentEmailFlag === true &&
      this.studentPasswordFlag === true &&
      this.studentRetypeFlag === true
    ) {
      this.link = '/login';
      this.newStudents.push(this.addStudentToArray(click, index));
      //set them all to false for future students
      this.resetStudentFlags();
    } else {
      this.link = null;
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

  private addStudentToArray(click, index): Student {
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
      email: studentEmail,
      username: studentUserName,
      password: studentPasssword,
    };
    return student;
  }

  checkIfParent(): boolean {
    var accountType = (<HTMLSelectElement>document.getElementById('types'))
      .value;
    if (accountType == 'parent') {
      this.parentAccountFlag = true;
    } else {
      this.parentAccountFlag = false;
    }

    return this.parentAccountFlag;
  }

  checkIfCreateNewStudent(create): void {
    if (create == event) {
      this.newStudentFlag = true;
      document.getElementById('create').style.display = 'none'; //hide create student button
      this.numStudents.push(0);
      this.numNewStudents++;
    }
  }

  removeNewStudent(click, index): void {
    if (click == event) {
      if (this.numNewStudents == 1) {
        this.newStudentFlag = false;
        this.numStudents = [];
        this.numNewStudents = 0;
        this.newStudents = [];
        document.getElementById('create').style.display = 'inline'; //show create student button
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
    //account not valid
    if (!this.checkIfValidAccount()) {
      return;
    }
    var firstName: string = (<HTMLInputElement>(
      document.getElementById('firstName')
    )).value;
    var lastName: string = (<HTMLInputElement>(
      document.getElementById('lastName')
    )).value;
    var email: string = (<HTMLInputElement>document.getElementById('email'))
      .value;
    var password: string = (<HTMLInputElement>(
      document.getElementById('password')
    )).value;
    var username: string = (<HTMLInputElement>(
      document.getElementById('username')
    )).value;
    var accountType: string = (<HTMLSelectElement>(
      document.getElementById('types')
    )).value;

    let url: string = '';

    if (accountType === 'parent' && this.newStudentFlag === true) {
      this.newStudents = this.clearNulls(this.newStudents);
      var students = JSON.stringify(this.newStudents);
      url = `${environment.urls.middlewareURL}/user/?first=${firstName}&last=${lastName}&email=${email}&password=${password}&username=${username}&role=${accountType}&students=${students}`;
    } else {
      url = `${environment.urls.middlewareURL}/user/?first=${firstName}&last=${lastName}&email=${email}&password=${password}&username=${username}&role=${accountType}`;
    }

    this.httpGetAsync(url, (response) => {
      if (
        JSON.parse(response) ==
        'This username has been taken. Please choose another.'
      ) {
        this.link = '/signup';
      }
    });
  }

  /*
    Allows a fake instance of the user input to be used for test class
  */
  private allowTesting(userParameter: any, HtmlId: any) {
    if (userParameter == event) {
      return (userParameter = (<HTMLInputElement>(
        document.getElementById(HtmlId)
      )).value);
    }
    return userParameter;
  }

  private httpGetAsync(theUrl: string, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open('POST', theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }
}

export interface Student {
  first: string;
  last: string;
  email: string;
  username: string;
  password: string;
}
