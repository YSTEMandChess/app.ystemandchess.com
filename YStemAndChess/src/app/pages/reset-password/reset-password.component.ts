import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  link = '/';
  private usernameFlag = false;
  private emailFlag = false;
  userNameError = '';
  resetPasswordError = '';
  emailError: string = '';
  public result: any;
  public showData = false;

  constructor(private cookie: CookieService) {}

  ngOnInit(): void {}
  usernameVerification() {
    let username = (<HTMLInputElement>document.getElementById('username'))
      .value;
    if (username.length > 2) {
      this.usernameFlag = true;
    } else {
      this.usernameFlag = false;
    }
    this.showError();
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
  errorMessages() {
    if (this.emailFlag == false || this.usernameFlag == false) {
      this.resetPasswordError = 'Invalid username or email';
    } else {
      this.userNameError = '';
    }
  }
  showError() {
    if (this.usernameFlag == false) {
      this.userNameError = 'Invalid username';
    } else {
      this.userNameError = '';
    }
  }
  private allowTesting(userParameter: any, HtmlId: any) {
    if (userParameter == event) {
      return (userParameter = (<HTMLInputElement>(
        document.getElementById(HtmlId)
      )).value);
    }
    return userParameter;
  }

  verifyUser() {
    if (this.usernameFlag == true && this.emailFlag == true) {
      this.verifyInDataBase();
    } else {
      this.link = '/resetpassword';
    }
  }
  verifyInDataBase() {
    var username = (<HTMLInputElement>document.getElementById('username'))
      .value;
    var email = (<HTMLInputElement>document.getElementById('email')).value;
    this.httpGetAsync(
      `${environment.urls.middlewareURL}/user/sendMail?username=${username}&email=${email}`,
      'POST',
      (response) => {
        if (response.status === 200) {
          this.result = '';
          this.showData = true;
        } else {
          this.result = 'Invalid data';
          this.showData = false;
        }
      }
    );
  }
  private httpGetAsync(theUrl: string, method: string = 'POST', callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      callback(xmlHttp);
    };
    xmlHttp.open(method, theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader(
      'Authorization',
      `Bearer ${this.cookie.get('login')}`
    );
    xmlHttp.send(null);
  }
}
