import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayComponent } from './pages/play/play.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';


const routes: Routes = [
  {path: '', component: PlayComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
