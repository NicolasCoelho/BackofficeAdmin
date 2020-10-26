import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Authentication } from '../_services/authentication';
import { Ws } from '../_services/ws';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {

  public loginFormGroup: FormGroup;

  constructor(private ws: Ws, private auth: Authentication, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    let getToken = !this.auth.hasToken()

    if (this.auth.hasToken()) {
      if(this.auth.isTokenExpired()) {
        getToken = true
      }
    }
    if(getToken) this.ws.getToken().then().catch(err => console.log(err))
  }

  login() {
    const username = this.loginFormGroup.get('username').value;
    const password = this.loginFormGroup.get('password').value;

    this.ws.authenticate(username,password).then(
      r => {
        this.router.navigate(['dashboard'])
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
  }

}
