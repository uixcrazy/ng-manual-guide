import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpModule } from '@angular/http'; // ↓↓↓ upgrade to A5
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import {
  LoginComponent,
 } from './components/index';
 import { AuthComponent } from './auth.component';
 import { AuthRoutingModule } from './auth-routing.module';
 import { AuthenticationService } from './services/authentication.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
  ],
  providers: [
    AuthenticationService,
  ],
  exports: []
})
export class AuthModule {}
