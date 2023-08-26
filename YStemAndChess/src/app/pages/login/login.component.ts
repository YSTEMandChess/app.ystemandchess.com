import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  link = '/';
  private usernameFlag = false;
  private passwordFlag = false;
  loginError = '';

  constructor(private cookie: CookieService) {}

  ngOnInit(): void {}

  usernameVerification() {
    var username = (<HTMLInputElement>document.getElementById('username'))
      .value;

    if (username.length > 2) {
      this.usernameFlag = true;
    } else {
      this.usernameFlag = false;
    }
  }

  passwordVerification() {
    var password = (<HTMLInputElement>document.getElementById('password'))
      .value;

    if (password.length < 8) {
      this.passwordFlag = false;
    } else {
      this.passwordFlag = true;
    }
  }

  verifyUser() {
    if (this.usernameFlag == true && this.passwordFlag == true) {
      this.verifyInDataBase();
    } else {
      this.link = '/login';
    }
  }

  verifyInDataBase() {
    var username = (<HTMLInputElement>document.getElementById('username'))
      .value;
    var password = (<HTMLInputElement>document.getElementById('password'))
      .value;
    let url = `${environment.urls.middlewareURL}/auth/login?username=${username}&password=${password}`;
    this.httpGetAsync(url, (response) => {
      if (response == 'The username or password is incorrect.') {
        this.loginError = 'Username or Password is incorrect';
      } else {
        this.cookie.set('login', JSON.parse(response).token, 1);
        let payload = JSON.parse(atob(response.split('.')[1]));
        console.log(payload,true);
        switch (payload['role']) {
          case 'student':
            window.location.pathname = '/student';
            break;
          case 'parent':
            window.location.pathname = '/parent';
            break;
          case 'mentor':
            window.location.pathname = '/mentor-profile';
            break;
          case 'admin':
            window.location.pathname = '/admin';
            break;
          default:
            window.location.pathname = '';
        }
      }
    });
  }

  errorMessages() {
    if (this.passwordFlag == false || this.usernameFlag == false) {
      this.loginError = 'Invalid username or password';
    } else {
      this.loginError = '';
    }
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
