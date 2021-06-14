import { Component, OnInit } from '@angular/core';
import { Ws } from '../../_services/ws';
import { PaginetedList } from '../../_models/paginatedList';
import { User } from '../../_models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public paginatedUsers: PaginetedList = new PaginetedList();

  public search = {
    name: "",
    timer: null
  }

  public queryString: string;

  constructor(private ws: Ws) {
    this.paginatedUsers.pageSize = 25;
    this.paginatedUsers.currentPage = 1;
  }

  ngOnInit(): void {
    this.getContent()
  }

  updateQuery() {
    this.queryString = `?size=${this.paginatedUsers.pageSize}&page=${this.paginatedUsers.currentPage}`;
    if (this.search.name !== "") {
      this.queryString += `&name=${this.search.name}`;
    }
  }

  getContent() {
    this.ws.getUsers(this.queryString).then((response) => {
      Object.assign(this.paginatedUsers, response)
    });
  }

  changePage(next) {
    next ? this.paginatedUsers.currentPage++ : this.paginatedUsers.currentPage-- ;
    this.updateTable();
  }

  updateTable() {
    this.updateQuery();
    this.getContent();
  }

  delayUpdate() {
    if (this.search.timer !== null) {
        clearTimeout(this.search.timer);
    }
    this.search.timer = setTimeout(() => {
      this.updateTable();
    },700);
  }
}
