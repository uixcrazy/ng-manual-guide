import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import {
  SigninComponent,
  SignupComponent,
  ChangepassComponent
 } from './components';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
      { path: 'auth/signin', component: SigninComponent },
      { path: 'auth/signup', component: SignupComponent },
      { path: 'auth/changepass', component: ChangepassComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
