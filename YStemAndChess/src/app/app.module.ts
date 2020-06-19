import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayComponent } from './pages/play/play.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { BeAMentorComponent } from './pages/be-amentor/be-amentor.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { StudentComponent } from './pages/student/student.component';
import { ParentComponent } from './pages/parent/parent.component';
import { PlayMentorComponent } from './pages/play-mentor/play-mentor.component';
import { PlayNologComponent } from './pages/play-nolog/play-nolog.component';
import { DonateComponent } from './pages/donate/donate.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BeAMentorComponent,
    ProgramsComponent,
    StudentComponent,
    ParentComponent,
    PlayMentorComponent,
    PlayNologComponent,
    DonateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientTestingModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
