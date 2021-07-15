import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { PlayComponent } from './pages/play/play.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { BeAMentorComponent } from './pages/be-amentor/be-amentor.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { StudentComponent } from './pages/student/student.component';
import { PlayMentorComponent } from './pages/play-mentor/play-mentor.component';
import { DonateComponent } from './pages/donate/donate.component';
import { LearningsComponent } from './pages/learnings/learnings.component';
import { MentorDashboardComponent } from './pages/mentor-dashboard/mentor-dashboard.component';
import { PlayNologComponent } from './pages/play-nolog/play-nolog.component';
import { ParentComponent } from './pages/parent/parent.component';
import { ParentAddStudentComponent } from './pages/parent-add-student/parent-add-student.component';
import { HeaderComponent } from './header/header.component';
import { StudentRecordingsComponent } from './pages/student-recordings/student-recordings.component';
import { LessonsComponent } from './pages/lessons/lessons.component';
import { PieceLessonsComponent } from './pages/piece-lessons/piece-lessons.component';
import { PlayLessonComponent } from './pages/play-lesson/play-lesson.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BoardEditorComponent } from './pages/board-editor/board-editor.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginGuardService } from './services/login-guard/login-guard.service';
import { BoardAnalyzerComponent } from './pages/board-analyzer/board-analyzer.component';
import { WhyChessComponent } from './pages/why-chess/why-chess.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // Lets remove the one below this comment (PlayComponent) when we go into production
  { path: 'play', component: PlayComponent },
  {
    path: 'login',
    component: LoginComponent,
    data: { redirect: true },
    canActivate: [LoginGuardService],
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { redirect: true },
    canActivate: [LoginGuardService],
  },
  { path: 'be-amentor', component: BeAMentorComponent },
  { path: 'programs', component: ProgramsComponent },
  { path: 'donate', component: DonateComponent },
  {
    path: 'student',
    component: StudentComponent,
    data: { roles: ['student', 'admin'] },
    canActivate: [LoginGuardService],
  },
  {
    path: 'parent',
    component: ParentComponent,
    data: { roles: ['parent', 'admin'] },
    canActivate: [LoginGuardService],
  },
  {
    path: 'parent-add-student',
    component: ParentAddStudentComponent,
    data: { roles: ['parent', 'admin'] },
    canActivate: [LoginGuardService],
  },
  {
    path: 'play-mentor',
    component: PlayMentorComponent,
    data: { roles: ['mentor', 'admin'] },
    canActivate: [LoginGuardService],
  },
  {
    path: 'mentor-dashboard',
    component: MentorDashboardComponent,
    data: { roles: ['mentor', 'admin'] },
    canActivate: [LoginGuardService],
  },
  { path: 'play-nolog', component: PlayNologComponent },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'student-recording',
    component: StudentRecordingsComponent,
    data: { roles: ['student', 'parent', 'admin'] },
    canActivate: [LoginGuardService],
  },
  {
    path: 'lessons',
    component: LessonsComponent,
    data: { roles: ['student', 'admin'] },
    canActivate: [LoginGuardService],
  },
  {
    path: 'learnings',
    component: LearningsComponent,
    data: { roles: ['student', 'admin'] },
    canActivate: [],
  },
  {
    path: 'piece-lessons',
    component: PieceLessonsComponent,
    data: { roles: ['student', 'admin'] },
    canActivate: [LoginGuardService],
  },
  { path: 'play-lesson', component: PlayLessonComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'board-editor', component: BoardEditorComponent },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'board-analyzer', component: BoardAnalyzerComponent },
  { path: 'why-chess', component: WhyChessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [HeaderComponent, LoginGuardService],
})
export class AppRoutingModule {}
