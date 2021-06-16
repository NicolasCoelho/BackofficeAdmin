import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/authentication/auth.guard';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnviromentsComponent } from './dashboard/enviroments/enviroments.component';
import { StoresComponent } from './dashboard/stores/stores.component';
import { UsersComponent } from './dashboard/users/users.component';
import { HomeComponent } from './dashboard/home/home.component';
import { SalesComponent } from './dashboard/sales/sales.component';
import { PaymentsComponent } from './dashboard/payments/payments.component';
import { RegisterEnviromentComponent } from './dashboard/register-enviroment/register-enviroment.component';
import { RegisterStoreComponent } from './dashboard/register-store/register-store.component';
import { RegisterUserComponent } from './dashboard/register-user/register-user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'enviroments', component: EnviromentsComponent },
      { path: 'enviroments/register', component: RegisterEnviromentComponent },
      { path: 'enviroments/edit/:id', component: RegisterEnviromentComponent },
      { path: 'stores', component: StoresComponent },
      { path: 'stores/register', component: RegisterStoreComponent },
      { path: 'stores/edit/:id', component: RegisterStoreComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/register', component: RegisterUserComponent },
      { path: 'users/edit/:id', component: RegisterUserComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'payments', component: PaymentsComponent },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
