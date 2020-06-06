import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  link = null;
  private usernameFlag = false;
  private passwordFlag = false;
  loginError = "";

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
  }

  usernameVerification() {
    var username = (<HTMLInputElement>document.getElementById("username")).value;

    if(username.length > 2) {
      //check username against database
      this.usernameFlag = true;
    } else {
      this.usernameFlag = false;
    }
  }

  passwordVerification() {
    var password = (<HTMLInputElement>document.getElementById("password")).value;

    if(password.length < 8) {
      this.passwordFlag = false;
    } else {
      //check password against username in database
      this.passwordFlag = true;
    }
  }

  verifyUser() {
    if(this.usernameFlag == true && this.passwordFlag == true) {
      this.verifyInDataBase();
    } else {
      this.link = "/login";
    }
  }

  verifyInDataBase() {
    var username = (<HTMLInputElement>document.getElementById('username')).value;
    var password = (<HTMLInputElement>document.getElementById('password')).value;
    let url = `http://127.0.0.1:8000/?reason=verify&username=${username}&password=${password}`;
    this.httpGetAsync(url, (response) => {
      if(response == "The username or password is incorrect.") {
        this.link = "/login";
      } else {
        this.cookie.set("login", response, 1);
        this.link = "";
      }
      console.log(response);
    })
  }

  private httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
  }

  errorMessages() {
    if(this.passwordFlag == false || this.usernameFlag == false) {
      this.loginError = "Invalid username or password"
    } else {
      this.loginError = "";
    }
  }

}
