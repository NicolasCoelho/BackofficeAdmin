import { Component, OnInit } from '@angular/core';
import { Ws } from '../../_services/ws'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public obj = {version: ''}

  constructor(private ws: Ws) { }

  ngOnInit(): void {
    //
    this.ws.getHealth().then(r=> this.obj.version = r.version)
  }

}
