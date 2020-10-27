// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

// Comunity Modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

// Services
import { Authentication } from './_services/authentication';
import { Ws } from './_services/ws';

// Guards and interceptores
import { AuthGuard } from './_guards/authentication/auth.guard';

// Pages and Compenents
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginCardComponent } from './login-card/login-card.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LoginCardComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [AuthGuard, Authentication, Ws],
  bootstrap: [AppComponent],
})
export class AppModule {}
