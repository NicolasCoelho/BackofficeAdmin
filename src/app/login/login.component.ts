import { Component, OnInit } from '@angular/core';
import { Authentication } from '../_services/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public valor: string = "teste";

  constructor(private auth: Authentication) { }

  ngOnInit(): void {
  }

  login() {
  }
}
