import { Component, OnInit } from '@angular/core';
import { Ws } from '../../_services/ws';

import { Enviroment } from '../../_models/enviroments';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public enviroments: Array<Enviroment> = [];

  constructor(private ws: Ws) { }

  ngOnInit(): void {
    this.ws.getEnviroments().then(
      (response) => {
        Object.assign(this.enviroments, response)
        let teste = new Enviroment();
        teste.id = 1
        teste.name = "Ambiente"
        teste.password = 'asd'
        teste.status = 1
        teste.type = 1
        teste.url = 'https://asdasdasd.com'
        teste.created_at = '2020-10-20T16:56:33.000Z'
        this.enviroments.push(teste)
      }
    )
  }

}
