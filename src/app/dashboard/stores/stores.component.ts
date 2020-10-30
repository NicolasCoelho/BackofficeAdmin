import { Component, OnInit } from '@angular/core';
import { Ws } from '../../_services/ws';
import { Store } from '../../_models/stores';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  public stores: Array<Store> = [];
  constructor(private ws: Ws, private router: Router) {}

  ngOnInit(): void {
    this.ws.getStores().then((data) => {
      //object assing = passa todos os valores do data para dentro de stores;
      Object.assign(this.stores, data);
      let teste = new Store();
      teste.name = 'Moisés da Silva';
      teste.id = '123456';
      teste.status = 1;
      teste.enviroment_id = 1;
      teste.url = 'http://lasdassd.com.br';
      teste.updatedAt = '2020-10-20T16:56:33.000Z';
      this.stores.push(teste);
    });
  }

  goTo(target) {
    this.router.navigate(['dashboard', 'stores', target]);
  }
}
