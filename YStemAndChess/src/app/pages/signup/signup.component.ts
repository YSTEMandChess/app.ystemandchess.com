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

  firstNameVerification(firstName: any) {
    firstName = this.allowTesting(firstName, 'firstName');

    if(firstName.length == 0) {
      this.firstNameFlag = false;
      this.firstNameError = "Invalid First Name"
    } else {
      this.firstNameFlag = true;
      this.firstNameError = "";
    }
  }

  lastNameVerification(lastName: any) {

    lastName = this.allowTesting(lastName, 'lastName');
    
    if(lastName.length == 0) {
      this.lastNameFlag = false;
      this.lastNameError = "Invalid Last Name"
    } else {
      this.lastNameFlag = true;
      this.lastNameError = "";
    }
  }

  emailVerification(email: any) {
    
    email = this.allowTesting(email, 'email');

    if(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(email)) {
      this.emailFlag = true;
      this.emailError = "";
      return true;
    } else {
      this.emailFlag = false;
      this.emailError = "Invalid Email"
      return false;
    }
  }

  usernameVerification(username: any) {
    username = this.allowTesting(username, 'username');
    
    if(username.length < 2 || /[\^$.|?*+(){}]/.test("username")) {
      //check username against database
      this.userNameFlag= false;
      this.userNameError = "Invalid Username";
    } else {
      this.userNameFlag= true;
      this.userNameError = ""
    }
  }

  passwordVerification(password: any) {
    password = this.allowTesting(password, 'password');

    if(password.length < 8) {
      this.passwordFlag = false;
      this.passwordError = "Invalid Password"
    } else {
      //verify password with username
      this.passwordFlag = true;
      this.passwordError = "";
    }
  }

  retypePasswordVerification(retypedPassword: any, password: any) {
    retypedPassword = this.allowTesting(retypedPassword, 'retypedPassword');
    password = this.allowTesting(password, 'password');

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
    var lastName = (<HTMLInputElement>document.getElementById("lastName")).value;
    var email = (<HTMLInputElement>document.getElementById("email")).value;
    var password = (<HTMLInputElement>document.getElementById("password")).value;
    var accountType = (<HTMLSelectElement>document.getElementById("types")).value;
    let value = this.http.get("http://127.0.0.1:8000", {responseType: 'text'}).subscribe(
      response => console.log(response),
      err => console.log(err)
    );
    console.log(value);
  }

  /*
    Allows a fake instance of the user input to be used for test classes
  */
  private allowTesting(userParameter, HtmlId) {
    if(userParameter == event) {
      return userParameter = (<HTMLInputElement>document.getElementById(HtmlId)).value;
    } else {
      return userParameter;
    }
  }
}

