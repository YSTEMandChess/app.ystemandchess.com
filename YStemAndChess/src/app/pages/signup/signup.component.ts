import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createAotUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  link = null;
  private firstNameFlag = false;
  private lastNameFlag = false;
  private emailFlag = false;
  private userNameFlag = false;
  private passwordFlag = false;
  private retypeFlag = false;
  firstNameError = "";
  lastNameError = "";
  emailError = "";
  userNameError = "";
  passwordError = "";
  retypePasswordError = "";

  constructor(
    private http: HttpClient
    ) { }

  ngOnInit(): void {
  }

  firstNameVerification() {
    var firstName = (<HTMLInputElement>document.getElementById("firstName")).value;

    if(firstName.length == 0) {
      this.firstNameFlag = false;
      this.firstNameError = "Invalid First Name"
    } else {
      this.firstNameFlag = true;
      this.firstNameError = "";
    }
  }

  lastNameVerification() {
    var lastName = (<HTMLInputElement>document.getElementById("lastName")).value;

    if(lastName.length == 0) {
      this.lastNameFlag = false;
      this.lastNameError = "Invalid Last Name"
    } else {
      this.lastNameFlag = true;
      this.lastNameError = "";
    }
  }

  emailVerification() {
    var email = (<HTMLInputElement>document.getElementById("email")).value;
    if(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(email)) {
      this.emailFlag = true;
      this.emailError = "";
    } else {
      this.emailFlag = false;
      this.emailError = "Invalid Email"
    }
  }

  usernameVerification() {
    var username = (<HTMLInputElement>document.getElementById("username")).value;
    
    if(username.length < 2 || /[\^$.|?*+(){}]/.test("username")) {
      //check username against database
      this.userNameFlag= false;
      this.userNameError = "Invalid Username";
    } else {
      this.userNameFlag= true;
      this.userNameError = ""
    }
  }

  passwordVerification() {
    var password = (<HTMLInputElement>document.getElementById("password")).value;

    if(password.length < 8) {
      this.passwordFlag = false;
      this.passwordError = "Invalid Password"
    } else {
      //verify password with username
      this.passwordFlag = true;
      this.passwordError = "";
    }
  }

  retypePasswordVerification() {
    var retypedPassword = (<HTMLInputElement>document.getElementById("retypedPassword")).value;
    var password = (<HTMLInputElement>document.getElementById("password")).value;

    if(retypedPassword === password) {
      this.retypeFlag = true;
      this.retypePasswordError = "";
    } else {
      this.retypeFlag = false;
      this.retypePasswordError = "Passwords do not match"
    }
  }

  checkIfValidAccount() {
    if(this.firstNameFlag === true && this.lastNameFlag === true && this.emailFlag === true
      && this.userNameFlag === true && this.passwordFlag === true && this.retypeFlag === true) {
        this.SendToDataBase();
        this.link = "/login";
      } else {
        this.link = null;
      }
  }

  private SendToDataBase() {
    var firstName = (<HTMLInputElement>document.getElementById("firstName")).value;
    let value = this.http.get("http://127.0.0.1:8000", {responseType: 'text'}).subscribe(
      response => console.log(response),
      err => console.log(err)
    );
    console.log(value);
  }
}
