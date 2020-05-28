import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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
      this.link = "";
    } else {
      this.link = "/login";
    }
  }

  errorMessages() {
    if(this.passwordFlag == false || this.usernameFlag == false) {
      this.loginError = "Invalid username or password"
    } else {
      this.loginError = "";
    }
  }

}
