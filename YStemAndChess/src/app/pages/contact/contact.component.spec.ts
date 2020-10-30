import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from '../../_modal';
import { HttpClient } from '@angular/common/http';

describe('Name Verification', () => {
  let http: HttpClient;
  let contact: ContactComponent = new ContactComponent(http);

  //false tests
  it('no input should be false', () => {
    const result = contact.fullNameVerification("");
    expect(result).toBe(false);
  });

  it('a space should be false', () => {
    const result = contact.fullNameVerification(" ");
    expect(result).toBe(false);
  });

  it('a lot of spaces should be false', () => {
    const result = contact.fullNameVerification("                                         ");
    expect(result).toBe(false);
  });

  it('numbers should be false', () => {
    const result = contact.fullNameVerification("123");
    expect(result).toBe(false);
  });

  it('numbers then name should be false', () => {
    const result = contact.fullNameVerification("123larry");
    expect(result).toBe(false);
  });

  it('numbers within the name should be false', () => {
    const result = contact.fullNameVerification("dev1n");
    expect(result).toBe(false);
  });

  it('the name then nubmers should be false', () => {
    const result = contact.fullNameVerification("larry123");
    expect(result).toBe(false);
  });

  it('special characters should be false', () => {
    const result = contact.fullNameVerification("!@");
    expect(result).toBe(false);
  });

  it('special characters then name should be false', () => {
    const result = contact.fullNameVerification("!@larry");
    expect(result).toBe(false);
  });

  it('special characters within the name should be false', () => {
    const result = contact.fullNameVerification("dev!n");
    expect(result).toBe(false);
  });

  it('the name then special characters should be false', () => {
    const result = contact.fullNameVerification("larry!!!");
    expect(result).toBe(false);
  });

  it('name length of 1 should be false', () => {
    const result = contact.fullNameVerification("a");
    expect(result).toBe(false);
  });

  it('name length of 31 should be false', () => {
    const result = contact.fullNameVerification("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    expect(result).toBe(false);
  });

  //true tests
  it('name length of 2 should be true', () => {
    const result = contact.fullNameVerification("Dj");
    expect(result).toBe(true);
  });

  it('name length of 30 should be true', () => {
    const result = contact.fullNameVerification("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    expect(result).toBe(true);
  });

});

describe('Email Verification', () => {
  let http: HttpClient;
  let contact: ContactComponent = new ContactComponent(http);

  //false tests
  it('no input should be false', () => {
    const result = contact.emailVerification("");
    expect(result).toBe(false);
  });

  it('email should be false', () => {
    const result = contact.emailVerification("email");
    expect(result).toBe(false);
  });

  it('cross-site scripting attempt should be false', () => {
    const result = contact.emailVerification("<script>alert('HACKED')</script>");
    expect(result).toBe(false);
  });

  it('email@ should be false', () => {
    const result = contact.emailVerification("email@");
    expect(result).toBe(false);
  });

  it('email@email should be false', () => {
    const result = contact.emailVerification("email@email");
    expect(result).toBe(false);
  });

  it('email@email. should be false', () => {
    const result = contact.emailVerification("email@email.");
    expect(result).toBe(false);
  });

  it('email@email.a should be false', () => {
    const result = contact.emailVerification("email@email.a");
    expect(result).toBe(false);
  });

  it('EMAIL@EMAIL.COM should be false', () => {
    const result = contact.emailVerification("EMAIL@EMAIL.COM");
    expect(result).toBe(false);
  });

  //true tests
  it('email@email.com should be true', () => {
    const result = contact.emailVerification("email@email.com");
    expect(result).toBe(true);
  });

  it('email@email.iamalongld should be true', () => {
    const result = contact.emailVerification("enail@email.iamalongld");
    expect(result).toBe(true);
  });

  it('email@email.au should be true', () => {
    const result = contact.emailVerification("email@email.au");
    expect(result).toBe(true);
  });
});



describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactComponent, HeaderComponent, FooterComponent ],
      imports: [ HttpClientTestingModule, ModalModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
