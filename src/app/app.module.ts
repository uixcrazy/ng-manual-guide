import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ManualGuideModule } from './manual-guide/manual-guide.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from './auth/auth.module';
import { BaseModule } from './base/base.module';
// import { PageNotFoundComponent } from './not-found.component';
import { AuthGuard } from './auth/guards/auth.guard';

import { mockBackendProvider } from './helpers/mock-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ManualGuideModule,
    // Feature
    AuthModule,
    BaseModule,
  ],
  providers: [
    AuthGuard,
    // providers used to create fake backend
    mockBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
