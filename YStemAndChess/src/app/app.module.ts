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
import { LearningsComponent } from './pages/learnings/learnings.component';
import { MentorDashboardComponent } from './pages/mentor-dashboard/mentor-dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ParentAddStudentComponent } from './pages/parent-add-student/parent-add-student.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { environment } from 'src/environments/environment';
import { StudentRecordingsComponent } from './pages/student-recordings/student-recordings.component';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { PlayLessonComponent } from './pages/play-lesson/play-lesson.component';
import { PieceLessonsComponent } from './pages/piece-lessons/piece-lessons.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LessonsService as LerningsService } from './lessons.service';
import { BoardEditorComponent } from './pages/board-editor/board-editor.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginGuardService } from './services/login-guard/login-guard.service';
import { BoardAnalyzerComponent } from './pages/board-analyzer/board-analyzer.component';
import { WhyChessComponent } from './pages/why-chess/why-chess.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SetPasswordComponent } from './pages/set-password/set-password.component';
import {SponsorsComponent} from "./pages/sponsors/sponsors.component"
import {MissionHifiComponent} from "./pages/mission-hifi/mission-hifi.component"
import {FinancialsHifiComponent} from "./pages/financials/financials-hifi.component";
import {BoardHifiComponent} from "./pages/board/board-hifi.component";
import {MathArticleComponent} from "./pages/math-article/math-article.component";
import {OnlineArticleComponent} from "./pages/Online-expansion-article/online-article.component";
import {ComputerBenefitArticleComponent} from "./pages/computer-science-benefit-article/computer-benefit-article.component"
import {ChessBenefitArticleComponent} from "./pages/chess-benefit-article/chess-benefit-article.component";
import {MentoringBenefitArticleComponent} from "./pages/mentoring-benefit-article/mentoring-benefit-article.component";
import {AboutUsComponent} from "./pages/aboutUs/about-us.component"
import {MentorProfileComponent} from "./pages/mentor-profile/mentor-profile.component";
import {ParentProfileComponent} from "./pages/parent-profile/parent-profile.component";
import { PuzzlesComponent } from "./pages/puzzles/puzzles.component";
import { PuzzlesService } from './services/puzzles/puzzles.service';
import { CanvasWhiteboardModule } from "ng2-canvas-whiteboard";

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
    LearningsComponent,
    MentorDashboardComponent,
    AdminComponent,
    ParentAddStudentComponent,
    UserProfileComponent,
    StudentRecordingsComponent,
    LessonsComponent,
    PlayLessonComponent,
    PieceLessonsComponent,
    ContactComponent,
    BoardEditorComponent,
    LandingPageComponent,
    BoardAnalyzerComponent,
    WhyChessComponent,
    ResetPasswordComponent,
    SetPasswordComponent,
    SponsorsComponent,
    MissionHifiComponent,
    FinancialsHifiComponent,
    BoardHifiComponent,
    MathArticleComponent,
    OnlineArticleComponent,
    ComputerBenefitArticleComponent,
    ChessBenefitArticleComponent,
    MentoringBenefitArticleComponent,
    AboutUsComponent,
    MentorProfileComponent,
    ParentProfileComponent,
    PuzzlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientTestingModule,
    ModalModule,
    NgxAgoraModule.forRoot(agoraConfig),
    FormsModule,
    CanvasWhiteboardModule,
  ],
  providers: [CookieService, SocketService, LoginGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
