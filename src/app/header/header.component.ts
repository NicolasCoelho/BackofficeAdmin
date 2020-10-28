import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ws } from '../_services/ws';
import {
  faList,
  faUsers,
  faStore,
  faCopyright,
  faHome,
  faSignOutAlt,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { Authentication } from '../_services/authentication';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';

import { Health } from '../_models/health';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public faHome = faHome;
  public faList = faList;
  public faUsers = faUsers;
  public faStore = faStore;
  public faCopy = faCopyright;
  public faSingOut = faSignOutAlt;
  public faExclamation = faExclamation;

  public name: string;
  public health: Health = new Health();
  public ValueCallApi = null;

  constructor(
    private router: Router,
    private auth: Authentication,
    private ws: Ws
  ) {
    this.name = this.auth.getTokenData().n;
  }

  ngOnInit(): void {
    this.ws.getHealth().then(
      (response) => {
        Object.assign(this.health, response);
      });
  }

  goTo(target) {
    this.router.navigate(['dashboard', target]);
  }

  logOut() {
    this.auth.deleteToken();
    this.router.navigate(['/']);
  }

  callCard() {
    let btn = document.querySelector('#btnInfo');
    btn.classList.remove('btnInfoDispNone');
  }
}
