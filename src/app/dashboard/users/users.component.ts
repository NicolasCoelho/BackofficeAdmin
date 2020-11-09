import { Component, OnInit } from '@angular/core';
import { Ws } from '../../_services/ws';
import { User, UserPaginated } from '../../_models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public paginatedUsers: UserPaginated = new UserPaginated();
  constructor(private ws: Ws) {}

  ngOnInit(): void {
    this.getContent()
  }

  getContent(params="") {
    this.ws.getUsers(params).then((response) => {
      Object.assign(this.paginatedUsers, response)
    });
  }

  changePage(next) {
    next ? this.paginatedUsers.currentPage++ : this.paginatedUsers.currentPage-- ;
    let query = `?page=${this.paginatedUsers.currentPage}`;
    this.getContent(query)
  }
}
