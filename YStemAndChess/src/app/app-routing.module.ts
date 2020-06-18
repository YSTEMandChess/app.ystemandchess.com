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
import { PlayMentorComponent} from './pages/play-mentor/play-mentor.component';
import { MentorDashboardComponent } from './pages/mentor-dashboard/mentor-dashboard.component';
import { PlayNologComponent } from './pages/play-nolog/play-nolog.component';
import { ParentComponent } from './pages/parent/parent.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'play', component: PlayComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'be-amentor', component: BeAMentorComponent},
  {path: 'programs', component: ProgramsComponent},
  {path: 'student', component: StudentComponent},
  {path: 'parent', component: ParentComponent},
  {path: 'play-mentor', component: PlayMentorComponent},
  {path: 'mentor-dashboard', component: MentorDashboardComponent},
  {path: 'play-nolog', component: PlayNologComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
