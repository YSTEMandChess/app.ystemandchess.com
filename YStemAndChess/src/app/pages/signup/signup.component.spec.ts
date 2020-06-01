import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('Email Verification', () => {
  let http: HttpClient;
  let signup: SignupComponent = new SignupComponent(http);

  it('email@email.com should be true', () => {
    const result =  signup.emailVerification('email@email.com');
    expect(result).toBe(true);
  });

  // it('email should be false', () => {
  //   const result =  signup.emailVerification();
  //   const input = (<HTMLInputElement>document.getElementById('email')).value;
  //   input.innerText = "email";
  //   expect(result).toBe(false);
  // });
});

// describe('SignupComponent', () => {
//   let component: SignupComponent;
//   let fixture: ComponentFixture<SignupComponent>;


//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ SignupComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SignupComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//});
