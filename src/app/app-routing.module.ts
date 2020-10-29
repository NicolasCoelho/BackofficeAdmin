import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/authentication/auth.guard';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnviromentsComponent } from './dashboard/enviroments/enviroments.component';
import { StoresComponent } from './dashboard/stores/stores.component';
import { UsersComponent } from './dashboard/users/users.component';
import { HomeComponent } from './dashboard/home/home.component';
import { RegisterEnviromentComponent } from './dashboard/register-enviroment/register-enviroment.component';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'enviroments', component:EnviromentsComponent},
      { path: 'enviroments/register', component: RegisterEnviromentComponent},
      { path: 'stores', component: StoresComponent },
      { path: 'users', component: UsersComponent }
    ]},
  {path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
