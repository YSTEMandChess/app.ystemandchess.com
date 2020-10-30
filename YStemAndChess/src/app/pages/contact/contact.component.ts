import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public name:string;
  public email:string;
  public message:string;

  private fullNameFlag: boolean = false;
  private emailFlag: boolean = false;
  private messageFlag: boolean = false;

  fullNameError: string = "";
  emailError: string = "";
  messageError: string = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  fullNameVerification(fullName: any): boolean {
    fullName = this.allowTesting(fullName, 'fullName');

    if (/^[A-Za-z]{2,30}$/.test(fullName)) {
      this.fullNameFlag = true;
      this.fullNameError = "";
      return true;
    } else {
      this.fullNameFlag = false;
      this.fullNameError = "Invalid Name";
      return false;
    }
  }

  emailVerification(email: any): boolean {
    email = this.allowTesting(email, 'email');

    if(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(email)) {
      this.emailFlag = true;
      this.emailError = "";
      return true;
    } else {
      this.emailFlag = false;
      this.emailError = "Invalid Email";
      return false;
    }
  }

  messageVerification(message: any): boolean {
    message = this.allowTesting(message, 'message');

    if (/^[A-Za-z.]{0,250}$/) {
      this.messageFlag = true;
      this.messageError = "";
      return true;
    } else {
      this.messageFlag = true;
      this.messageError = "Invalid Meassage";
      return false;
    }
  }

  public submitForm() {

  }

  /*
    Allows a fake instance of the user input to be used for test class
  */
 private allowTesting(userParameter: any, HtmlId: any) {
  if (userParameter == event) {
    return userParameter = (<HTMLInputElement>document.getElementById(HtmlId)).value;
  }
  return userParameter;
}
}
