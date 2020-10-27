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
  public obj = { version: '' };
  public Amb = 'Mondial';
  public systemStatus = 'Running';

  constructor(
    private router: Router,
    private auth: Authentication,
    private ws: Ws
  ) {
    this.name = this.auth.getTokenData().n;
    //test
    // console.log(this.auth.getTokenData().s);

    this.XlHz = this.ws.getHealth().then(function (data) {
      Promise.resolve(data);
      console.log('Fazer a logica de alterar a cor do Btn aqui', data.status);
    });
    console.log(this.ws.getHealth());
  }

  ngOnInit(): void {
    this.ws.getHealth().then((r) => (this.obj.version = r.version));
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
