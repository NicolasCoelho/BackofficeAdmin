import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Authentication } from './_services/authentication';
import { Ws } from './_services/ws';

import { AuthGuard } from './_guards/authentication/auth.guard';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginCardComponent } from './login-card/login-card.component';
import { LoginFormComponent } from './login-card/login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LoginCardComponent,
    LoginFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [AuthGuard, Authentication, Ws],
  bootstrap: [AppComponent],
})
export class AppModule {}
