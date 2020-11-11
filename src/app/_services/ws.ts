import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Authentication } from './authentication';

import { Health } from '../_models/health';
import { Enviroment } from '../_models/enviroments';
import { Store } from '../_models/stores';
import { User, UserPaginated } from '../_models/user';
import { Contract } from '../_models/contract';
import { UserRequirements } from '../_models/user_requirements';
import { SaleStatus } from '../_models/sales_status';

@Injectable()
export class Ws {
  //public base_url = 'http://divulgadoresdevelopment-env.eba-pnvfbnm3.sa-east-1.elasticbeanstalk.com';
  public base_url = 'http://localhost:3000';
  public store_id = '6c6455ece193d4d2';

  public headers: HttpHeaders;
  public options: Object;

  constructor(private http: HttpClient, private auth: Authentication) {
    this.setHeaders(this.auth.getToken());
  }

  setHeaders(token = null) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: token === null ? '' : token,
    });
    this.options = { headers: this.headers };
  }

  // Info
  getHealth(): Promise<Health> {
    return this.http
      .get(`${this.base_url}/systemhealth`)
      .toPromise()
      .then((response: Health) => response);
  }

  // Token
  getToken(): Promise<any> {
    const id = this.store_id;
    return this.http
      .post(`${this.base_url}/token`, { store_id: id })
      .toPromise()
      .then((response: any) => {
        this.auth.setToken(response.token);
        this.setHeaders(response.token);
        return response;
      });
  }

  // Authentication
  authenticate(user, pass): Promise<any> {
    return this.http
      .post(
        `${this.base_url}/auth`,
        { username: user, password: pass },
        this.options
      )
      .toPromise()
      .then((response: any) => {
        this.setHeaders(response.token);
        this.auth.setToken(response.token);
        return response;
      });
  }

  // Enviroments
  getEnviroment(id:number):Promise<Enviroment> {
    return this.http
      .get(`${this.base_url}/enviroment/${id}`, this.options)
      .toPromise()
      .then(
        (response:Enviroment) => response
      )
  }

  getEnviroments(): Promise<Enviroment[]> {
    return this.http
      .get(`${this.base_url}/enviroments`, this.options)
      .toPromise()
      .then((response: Enviroment[]) => {
        return response;
      });
  }

  createEnviroment(payload): Promise<Enviroment> {
    return this.http
      .post(`${this.base_url}/enviroment`, payload, this.options)
      .toPromise()
      .then((response: Enviroment) => response);
  }

  changeEnviroment(id: number, payload: Enviroment): Promise<any> {
    return this.http
      .put(`${this.base_url}/enviroment/${id}`, payload, this.options)
      .toPromise()
  }

  // Store
  getStore(id: string): Promise<Store> {
    return this.http
    .get(`${this.base_url}/store/${id}`, this.options)
    .toPromise()
    .then(
      (response: Store) => response
    )
  }

  getStores(): Promise<Store[]> {
    return this.http
      .get(`${this.base_url}/stores`, this.options)
      .toPromise()
      .then((response: Store[]) => {
        return response;
      });
  }

  createStore(payload: Store): Promise<Store> {
    return this.http
      .post(`${this.base_url}/store`, payload, this.options)
      .toPromise()
      .then((response: Store) => response);
  }

  createStoreFull(payload): Promise<any> {
    return this.http
      .post(`${this.base_url}/store/full`, payload, this.options)
      .toPromise()
  }

  changeStore(payload: Store): Promise<any> {
    return this.http
      .post(`${this.base_url}/store/${payload.id}`, payload, this.options)
      .toPromise()
  }

  // Users
  getUsers(params=""): Promise<UserPaginated> {
    return this.http
      .get(`${this.base_url}/users${params}`, this.options)
      .toPromise()
      .then((response: UserPaginated) => {
        return response;
      });
  }

  // Contract
  getContractByStore(id: string): Promise<Contract> {
    return this.http
      .get(`${this.base_url}/contract/${id}/store`, this.options)
      .toPromise()
      .then(
        (response: Contract) => response
      )
  }

  // UserRequiremets
  getUserRequirementsByStore(id: string): Promise<UserRequirements> {
    return this.http
    .get(`${this.base_url}/userRequirements/${id}/store`, this.options)
    .toPromise()
    .then(
      (response: UserRequirements) => response
    )
  }

  // SalesStatus
  getSalesStatusByStore(id: string): Promise<SaleStatus> {
    return this.http
    .get(`${this.base_url}/salesStatus/${id}/store`, this.options)
    .toPromise()
    .then(
      (response: SaleStatus) => response
    )
  }
}
