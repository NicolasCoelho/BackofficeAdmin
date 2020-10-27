import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private auth: Authentication) {
    this.name = this.auth.getTokenData().n;
  }

  ngOnInit(): void {}

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
