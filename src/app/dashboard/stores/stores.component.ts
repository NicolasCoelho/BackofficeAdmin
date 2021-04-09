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
  public loading: boolean = true
  constructor(private ws: Ws, private router: Router) {}

  ngOnInit(): void {
    this.ws.getStores().then((data) => {
      Object.assign(this.stores, data);
    }).finally( () => this.loading = false )
  }

  goTo(target) {
    this.router.navigate(['dashboard', 'stores', target]);
  }

  edit(id) {
    this.router.navigate(['dashboard', 'stores', 'edit', id])
  }

}
