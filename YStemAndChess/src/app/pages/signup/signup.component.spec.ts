import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import{ HttpClient } from '@angular/common/http';

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
