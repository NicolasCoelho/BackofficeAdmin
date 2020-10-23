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
import { LeftComponent } from './login-card/left/left.component';
import { RightComponent } from './login-card/right/right.component';
import { FormComponent } from './login-card/right/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LoginCardComponent,
    LeftComponent,
    RightComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    Authentication,
    Ws
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
