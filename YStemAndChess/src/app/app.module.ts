import { SocketService } from './services/socket/socket.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { ModalModule } from './_modal/modal.module';
import { NgxAgoraModule, AgoraConfig } from 'ngx-agora';

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
import { MentorDashboardComponent } from './pages/mentor-dashboard/mentor-dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ParentAddStudentComponent } from './pages/parent-add-student/parent-add-student.component';
import { StudentRecordingsComponent } from './pages/student-recordings/student-recordings.component';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { PlayLessonComponent } from './pages/play-lesson/play-lesson.component';
import { PieceLessonsComponent } from './pages/piece-lessons/piece-lessons.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BoardEditorComponent } from './pages/board-editor/board-editor.component';
import { WhyChessComponent } from './pages/why-chess/why-chess.component';
import { LoginGuardService } from './services/login-guard/login-guard.service';

const agoraConfig: AgoraConfig = {
  AppID: '6c368b93b82a4b3e9fb8e57da830f2a4',
};

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
    DonateComponent,
    MentorDashboardComponent,
    AdminComponent,
    ParentAddStudentComponent,
    StudentRecordingsComponent,
    LessonsComponent,
    PlayLessonComponent,
    PieceLessonsComponent,
    ContactComponent,
    BoardEditorComponent,
    WhyChessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientTestingModule,
    ModalModule,
    NgxAgoraModule.forRoot(agoraConfig),
    NgxAgoraModule.forRoot({ AppID: "6c368b93b82a4b3e9fb8e57da830f2a4" }),
    FormsModule
  ],
  providers: [
    CookieService,
    SocketService,
    LoginGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
