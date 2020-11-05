import { Component, OnInit } from '@angular/core';
import { Ws } from '../../_services/ws';
import { User } from '../../_models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: Array<User> = [];
  constructor(private ws: Ws) {}

  ngOnInit(): void {
    // this.ws.getUsers().then((data) => {
    //   Object.assign(this.users, data);
    // });
  }

  mockUser() {
    let teste = new User();
    teste.id = 2;
    teste.name = 'Moisés Vilas Boas';
    teste.status = 1;
    teste.createdAt = '2020-10-20T16:56:33.000Z';
    this.users.push(teste);
  }
}
