import { Component, OnInit } from '@angular/core';
import { Ws } from '../../_services/ws';

import { Enviroment } from '../../_models/enviroments';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enviroments',
  templateUrl: './enviroments.component.html',
  styleUrls: ['./enviroments.component.scss'],
})
export class EnviromentsComponent implements OnInit {
  public enviroments: Array<Enviroment> = [];
  public loading: boolean = true;

  constructor(private ws: Ws, private router: Router) {}

  ngOnInit(): void {
    this.ws.getEnviroments().then((response) => {
      Object.assign(this.enviroments, response);
    }).finally( () => this.loading = false)
  }

  goTo(target) {
    this.router.navigate(['dashboard','enviroments',target])
  }

  edit(id) {
    this.router.navigate(['dashboard','enviroments','edit', id])
  }

}
