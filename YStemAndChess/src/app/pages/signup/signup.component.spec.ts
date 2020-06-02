import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import{ HttpClient } from '@angular/common/http';

describe('First Name Verification', () => {
  let http: HttpClient;
  let signup: SignupComponent = new SignupComponent(http);

  //false tests
  it('no input should be false', () => {
    const result = signup.firstNameVerification("");
    expect(result).toBe(false);
  });

  it('a space should be false', () => {
    const result = signup.firstNameVerification(" ");
    expect(result).toBe(false);
  });

  it('a lot of spaces should be false', () => {
    const result = signup.firstNameVerification("                                                       ");
    expect(result).toBe(false);
  });

  it('space in the middle of a first name should be false', () => {
    const result = signup.firstNameVerification("ben jamin");
    expect(result).toBe(false);
  });

  it('numbers should be false', () => {
    const result = signup.firstNameVerification("123");
    expect(result).toBe(false);
  });

  it('numbers and then first name should be false', () => {
    const result = signup.firstNameVerification("123larry");
    expect(result).toBe(false);
  });

  it('first name with numbers in between should be false', () => {
    const result = signup.firstNameVerification("dev1n");
    expect(result).toBe(false);
  });

  it('first name with numbers after should be false', () => {
    const result = signup.firstNameVerification("devin123");
    expect(result).toBe(false);
  });

  it('special characters should be false', () => {
    const result = signup.firstNameVerification("!@");
    expect(result).toBe(false);
  });

  it('special characters and then first name should be false', () => {
    const result = signup.firstNameVerification("!@larry");
    expect(result).toBe(false);
  });

  it('first name with special characters in between should be false', () => {
    const result = signup.firstNameVerification("dev!n");
    expect(result).toBe(false);
  });

  it('first name with special characters after should be false', () => {
    const result = signup.firstNameVerification("devin!!!");
    expect(result).toBe(false);
  });

  it('long first name should be false', () => {
    const result = signup.firstNameVerification("abcdefghijklmnopqrstuvxxyz");
    expect(result).toBe(false);
  });

  it('first name length of 1 should be false', () => {
    const result = signup.firstNameVerification("a");
    expect(result).toBe(false);
  });

  it('first name length of 16 should be false', () => {
    const result = signup.firstNameVerification("aaaaaaaaaaaaaaaa");
    expect(result).toBe(false);
  });

  //true test
  it('first name length of 2 should be true', () => {
    const result = signup.firstNameVerification("Dj");
    expect(result).toBe(true);
  });

  it('first name length of 15 should be true', () => {
    const result = signup.firstNameVerification("bbbbbbbbbbbbbbb");
    expect(result).toBe(true);
  });
});

describe('Email Verification', () => {
  let http: HttpClient;
  let signup: SignupComponent = new SignupComponent(http);

  //false tests
  it('email should be false', () => {
    const result =  signup.emailVerification('email');
    expect(result).toBe(false);
  });

  it('cross-site scripting attempt should be false', () => {
    const result =  signup.emailVerification("<script>alert('HACKED')</script>");
    expect(result).toBe(false);
  });

  it('email@ should be false', () => {
    const result =  signup.emailVerification("email@");
    expect(result).toBe(false);
  });

  it('email@email should be false', () => {
    const result =  signup.emailVerification("email@email");
    expect(result).toBe(false);
  });

  it('email@email. should be false', () => {
    const result =  signup.emailVerification("email@email.");
    expect(result).toBe(false);
  });

  it('email@email.a should be false', () => {
    const result =  signup.emailVerification("email@email.a");
    expect(result).toBe(false);
  });

  it('EMAIL@EMAIL.COM should be false', () => {
    const result =  signup.emailVerification("EMAIL@EMAIL.COM");
    expect(result).toBe(false);
  });

//true tests

  it('email@email.com should be true', () => {
    const result =  signup.emailVerification('email@email.com');
    expect(result).toBe(true);
  });

  it('email@email.iamalongtld should be true', () => {
    const result =  signup.emailVerification("email@email.iamalongtld");
    expect(result).toBe(true);
  });

  it('email@email.au should be true', () => {
    const result =  signup.emailVerification("email@email.iamalongtld");
    expect(result).toBe(true);
  });
});

describe('SignupComponent', () => {
  let http: HttpClient;
  let component: SignupComponent = new SignupComponent(http);
  let fixture: ComponentFixture<SignupComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
