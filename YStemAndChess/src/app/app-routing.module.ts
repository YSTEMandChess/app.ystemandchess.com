import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PlayComponent } from './pages/play/play.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { BeAMentorComponent } from './pages/be-amentor/be-amentor.component'; 
import { ProgramsComponent } from './pages/programs/programs.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'play', component: PlayComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'be-amentor', component: BeAMentorComponent},
  {path: 'programs', component: ProgramsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
