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

  mockEnviroment() {
    let teste = new Enviroment();
    teste.id = 1;
    teste.name = 'Ambiente';
    teste.password = 'asd';
    teste.status = 1;
    teste.type = 1;
    teste.url = 'https://asdasdasd.com';
    teste.created_at = '2020-10-20T16:56:33.000Z';
    this.enviroments.push(teste);
  }
}
