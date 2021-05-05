import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterModule, Router } from '@angular/router';


import { SignupComponent } from './signup.component';
import { LoginComponent } from '../login/login.component'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalModule } from '../../_modal/'
import{ HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

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

describe('Last Name Verification', () => {
  let http: HttpClient;
  let signup: SignupComponent = new SignupComponent(http);

  //false tests
  it('no input should be false', () => {
    const result = signup.lastNameVerification("");
    expect(result).toBe(false);
  });

  it('a space should be false', () => {
    const result = signup.lastNameVerification(" ");
    expect(result).toBe(false);
  });

  it('a lot of spaces should be false', () => {
    const result = signup.lastNameVerification("                                                       ");
    expect(result).toBe(false);
  });

  it('space in the middle of a first name should be false', () => {
    const result = signup.lastNameVerification("ben jamin");
    expect(result).toBe(false);
  });

  it('numbers should be false', () => {
    const result = signup.lastNameVerification("123");
    expect(result).toBe(false);
  });

  it('numbers and then last name should be false', () => {
    const result = signup.lastNameVerification("123larry");
    expect(result).toBe(false);
  });

  it('last name with numbers in between should be false', () => {
    const result = signup.lastNameVerification("dev1n");
    expect(result).toBe(false);
  });

  it('last name with numbers after should be false', () => {
    const result = signup.lastNameVerification("devin123");
    expect(result).toBe(false);
  });

  it('special characters should be false', () => {
    const result = signup.lastNameVerification("!@");
    expect(result).toBe(false);
  });

  it('special characters and then last name should be false', () => {
    const result = signup.lastNameVerification("!@larry");
    expect(result).toBe(false);
  });

  it('last name with special characters in between should be false', () => {
    const result = signup.lastNameVerification("dev!n");
    expect(result).toBe(false);
  });

  it('last name with special characters after should be false', () => {
    const result = signup.lastNameVerification("devin!!!");
    expect(result).toBe(false);
  });

  it('long last name should be false', () => {
    const result = signup.lastNameVerification("abcdefghijklmnopqrstuvxxyz");
    expect(result).toBe(false);
  });

  it('last name length of 1 should be false', () => {
    const result = signup.lastNameVerification("a");
    expect(result).toBe(false);
  });

  it('last name length of 16 should be false', () => {
    const result = signup.lastNameVerification("aaaaaaaaaaaaaaaa");
    expect(result).toBe(false);
  });

  //true test
  it('last name length of 2 should be true', () => {
    const result = signup.lastNameVerification("Dj");
    expect(result).toBe(true);
  });

  it('last name length of 15 should be true', () => {
    const result = signup.lastNameVerification("bbbbbbbbbbbbbbb");
    expect(result).toBe(true);
  });
});

describe('Username Verification', () => {
  let http: HttpClient;
  let signup: SignupComponent = new SignupComponent(http);

  //false tests
  it('no input should be false', () => {
    const result = signup.usernameVerification("");
    expect(result).toBe(false);
  });

  it('a space should be false', () => {
    const result = signup.usernameVerification(" ");
    expect(result).toBe(false);
  });

  it('a lot of spaces should be false', () => {
    const result = signup.usernameVerification("                                                       ");
    expect(result).toBe(false);
  });

  it('space in the middle of a username should be false', () => {
    const result = signup.usernameVerification("ben jamin");
    expect(result).toBe(false);
  });

  it('numbers should be false', () => {
    const result = signup.usernameVerification("123");
    expect(result).toBe(false);
  });

  it('numbers and then username should be false', () => {
    const result = signup.usernameVerification("123larry");
    expect(result).toBe(false);
  });

  it('special characters should be false', () => {
    const result = signup.usernameVerification("!@");
    expect(result).toBe(false);
  });

  it('special characters and then username should be false', () => {
    const result = signup.usernameVerification("!@larry");
    expect(result).toBe(false);
  });

  it('long username should be false', () => {
    const result = signup.usernameVerification("abcdefghijklmnopqrstuvxxyz");
    expect(result).toBe(false);
  });

  it('username length of 1 should be false', () => {
    const result = signup.usernameVerification("a");
    expect(result).toBe(false);
  });

  it('username length of 16 should be false', () => {
    const result = signup.usernameVerification("aaaaaaaaaaaaaaaa");
    expect(result).toBe(false);
  });

  //true tests
  it('username with numbers in between should be true', () => {
    const result = signup.usernameVerification("dev1n");
    expect(result).toBe(true);
  });

  it('username with numbers after should be true', () => {
    const result = signup.usernameVerification("devin123");
    expect(result).toBe(true);
  });

  it('username with special characters in between should be true', () => {
    const result = signup.usernameVerification("dev!n");
    expect(result).toBe(true);
  });

  it('username with special characters after should be true', () => {
    const result = signup.usernameVerification("devin!!!");
    expect(result).toBe(true);
  });

  it('username length of 2 should be true', () => {
    const result = signup.usernameVerification("Dj");
    expect(result).toBe(true);
  });

  it('username length of 15 should be true', () => {
    const result = signup.usernameVerification("bbbbbbbbbbbbbbb");
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

describe('Password Input Verification', () => {
  let http: HttpClient;
  let signup: SignupComponent = new SignupComponent(http);

  //false tests
  it('password length 1 should be false', () => {
    const result = signup.passwordVerification('a');
    expect(result).toBe(false);
  });

  it('password length 2 should be false', () => {
    const result = signup.passwordVerification('aa');
    expect(result).toBe(false);
  });

  it('password length 3 should be false', () => {
    const result = signup.passwordVerification('aaa');
    expect(result).toBe(false);
  });

  it('password length 4 should be false', () => {
    const result = signup.passwordVerification('aaaa');
    expect(result).toBe(false);
  });

  it('password length 5 should be false', () => {
    const result = signup.passwordVerification('aaaaa');
    expect(result).toBe(false);
  });

  it('password length 6 should be false', () => {
    const result = signup.passwordVerification('aaaaaa');
    expect(result).toBe(false);
  });

  it('password length 7 should be false', () => {
    const result = signup.passwordVerification('aaaaaaa');
    expect(result).toBe(false);
  });

  //true tests

  it('password length 8 should be true', () => {
    const result = signup.passwordVerification('bbbbbbbb');
    expect(result).toBe(true);
  });

  it('long password length should be true', () => {
    const result = signup.passwordVerification('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' +
    'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
    expect(result).toBe(true);
  });

  it('password with only special characters should be true', () => {
    const result = signup.passwordVerification('!~@#$%^&');
    expect(result).toBe(true);
  });

  it('password with only capitol letters should be true', () => {
    const result = signup.passwordVerification('ABCDFGHE');
    expect(result).toBe(true);
  });

  it('password with only lower case letters should be true', () => {
    const result = signup.passwordVerification('absdcfgh');
    expect(result).toBe(true);
  });

  it('password with special characters and capitol letters should be true', () => {
    const result = signup.passwordVerification('PASS!WORD');
    expect(result).toBe(true);
  });

  it('password with special characters and capitol letters should be true', () => {
    const result = signup.passwordVerification('passwor!');
    expect(result).toBe(true);
  });

  it('password with mix of characters should be true', () => {
    const result = signup.passwordVerification('Pass!W&*d');
    expect(result).toBe(true);
  });
});

describe('Retype Password Verification', () => {
  let http: HttpClient;
  let signup: SignupComponent = new SignupComponent(http);

  //false tests
  it('passwords that are not the same should be false', () => {
    const result = signup.retypePasswordVerification('password', 'password!');
    expect(result).toBe(false);
  });

  //true tests
  it('passwords the same should be true', () => {
    const result = signup.retypePasswordVerification('password', 'password');
    expect(result).toBe(true);
  });
});

describe('Clear nulls in array verification', () => {
  let http: HttpClient;
  let signup: SignupComponent = new SignupComponent(http);

  //true tests

  //array size 2
  it('null at beginning', () => {
    let arr = [null, 1];
    const result = signup.clearNulls(arr);
    expect(result).toEqual([1]);
  });

  it('null at end', () => {
    let arr = [1, null];
    const result = signup.clearNulls(arr);
    expect(result).toEqual([1]);
  });

  //array size 3
  it('null in middle', () => {
    let arr = [1, null, 2];
    const result = signup.clearNulls(arr);
    expect(result).toEqual([1,2]);
  });

  it('null in beginning', () => {
    let arr = [null, 1, 2];
    const result = signup.clearNulls(arr);
    expect(result).toEqual([1,2]);
  });

  it('null at end', () => {
    let arr = [1, 2, null];
    const result = signup.clearNulls(arr);
    expect(result).toEqual([1,2]);
  });

  it('first two null', () => {
    let arr = [null, null, 1];
    const result = signup.clearNulls(arr);
    expect(result).toEqual([1]);
  });

  it('last two null', () => {
    let arr = [1, null, null];
    const result = signup.clearNulls(arr);
    expect(result).toEqual([1]);
  });
});

describe('SignupComponent', () => {
  let http: HttpClient;
  let component: SignupComponent = new SignupComponent(http);
  let fixture: ComponentFixture<SignupComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent, HeaderComponent, FooterComponent, LoginComponent],
      imports: [ HttpClientTestingModule, RouterModule.forRoot(
        [
          {path: 'login', component: LoginComponent},
          {path: 'signup', component: SignupComponent},
        ]
      ), ModalModule ],

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
