import { Component, OnInit } from '@angular/core';
import { Ws } from '../../_services/ws';
import { User } from '../../_models/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: Array<User> = [];
  constructor(private ws: Ws) {}

  ngOnInit(): void {
    this.ws.getUsers().then((data) => {
      Object.assign(this.users, data);
      let teste = new User();

      teste.id = '2';
      teste.name = 'Moisés Vilas Boas';
      teste.status = 1;
      teste.created_at = '2020-10-20T16:56:33.000Z';
      this.users.push(teste);
    });
  }
}
