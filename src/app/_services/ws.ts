import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Authentication } from './authentication';

import { Health } from '../_models/health';
import { Enviroment } from '../_models/enviroments';
import { Store } from '../_models/stores';
import { User } from '../_models/user';
import { PaginetedList } from '../_models/paginatedList';
import { Contract } from '../_models/contract';
import { UserRequirements } from '../_models/userRequirements';
import { SystemStatusAndTypes } from '../_models/systemStatus';
import { Styles } from '../_models/styles';

@Injectable()
export class Ws {

  public baseUrl = "http://localhost:3000";
  public storeId = '6c6455ece193d4d2';

  public headers: HttpHeaders;
  public options: Object;

  constructor(private http: HttpClient, private auth: Authentication) {
    this.setHeaders(this.auth.getToken());
  }

  setHeaders(token = null) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token === null ? '' : `Basic ${token}`,
    });
    this.options = { headers: this.headers };
  }

  // Info
  getHealth(): Promise<Health> {
    return this.http
      .get(`${this.baseUrl}/systemhealth`)
      .toPromise()
      .then((response: Health) => response);
  }

  getSystemStatus(): Promise<SystemStatusAndTypes[]> {
    return this.http
      .get(`${this.baseUrl}/systemStatus`, this.options)
      .toPromise()
      .then((response: SystemStatusAndTypes[]) => response)
  }

  getSystemStatusByType(type:string): Promise<SystemStatusAndTypes[]> {
    return this.http
      .get(`${this.baseUrl}/systemStatus/${type}`, this.options)
      .toPromise()
      .then((response: SystemStatusAndTypes[]) => response)
  }

  getSystemTypes(): Promise<SystemStatusAndTypes[]> {
    return this.http
      .get(`${this.baseUrl}/systemTypes`, this.options)
      .toPromise()
      .then((response: SystemStatusAndTypes[]) => response)
  }

  getSystemTypesByType(type:string): Promise<SystemStatusAndTypes[]> {
    return this.http
      .get(`${this.baseUrl}/systemTypes/${type}`, this.options)
      .toPromise()
      .then((response: SystemStatusAndTypes[]) => response)
  }

  // Token
  getToken(): Promise<any> {
    const id = this.storeId;
    return this.http
      .post(`${this.baseUrl}/token`, { storeId: id })
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
        `${this.baseUrl}/auth`,
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
      .get(`${this.baseUrl}/enviroment/${id}`, this.options)
      .toPromise()
      .then(
        (response:Enviroment) => response
      )
  }

  getEnviroments(): Promise<Enviroment[]> {
    return this.http
      .get(`${this.baseUrl}/enviroments`, this.options)
      .toPromise()
      .then((response: Enviroment[]) => {
        return response;
      });
  }

  createEnviroment(payload): Promise<Enviroment> {
    return this.http
      .post(`${this.baseUrl}/enviroment`, payload, this.options)
      .toPromise()
      .then((response: Enviroment) => response);
  }

  changeEnviroment(payload: Enviroment): Promise<any> {
    const id = payload.id
    delete payload.id
    delete payload.createdAt
    delete payload.updatedAt
    return this.http
      .put(`${this.baseUrl}/enviroment/${id}`, payload, this.options)
      .toPromise()
  }

  // Store
  getStore(id: string): Promise<Store> {
    return this.http
    .get(`${this.baseUrl}/store/${id}`, this.options)
    .toPromise()
    .then(
      (response: Store) => response
    )
  }

  getStores(): Promise<Store[]> {
    return this.http
      .get(`${this.baseUrl}/stores`, this.options)
      .toPromise()
      .then((response: Store[]) => {
        return response;
      });
  }

  createStore(payload: Store): Promise<Store> {
    return this.http
      .post(`${this.baseUrl}/store`, payload, this.options)
      .toPromise()
      .then((response: Store) => response);
  }

  createStoreFull(payload): Promise<any> {
    return this.http
      .post(`${this.baseUrl}/store/full`, payload, this.options)
      .toPromise()
  }

  changeStore(payload: Store): Promise<any> {
    const id = payload.id
    delete payload.id
    delete payload.createdAt
    delete payload.updatedAt
    return this.http
      .put(`${this.baseUrl}/store/${id}`, payload, this.options)
      .toPromise()
  }

  // Users
  getUsers(params=""): Promise<PaginetedList> {
    return this.http
      .get(`${this.baseUrl}/users${params}`, this.options)
      .toPromise()
      .then((response: PaginetedList) => {
        return response;
      });
  }

  changeUser(id:string|number, payload: User): Promise<User> {
    return this.http
      .put(`${this.baseUrl}/user/${id}`, payload, this.options)
      .toPromise()
      .then((response: User) => {
        return response;
      });
  }

  getUser(id: number): Promise<User> {
    return this.http
      .get(`${this.baseUrl}/user/${id}`, this.options)
      .toPromise()
      .then(
        (response: User) => response
      )
  }

  // Contract
  getContractByStore(id: string): Promise<Contract> {
    return this.http
      .get(`${this.baseUrl}/contract/${id}/store`, this.options)
      .toPromise()
      .then(
        (response: Contract) => response
      )
  }

  changeContract(payload: Contract): Promise<any> {
    const id = payload.id
    delete payload.id
    delete payload.createdAt
    delete payload.updatedAt
    delete payload['storeId']
    return this.http
      .put(`${this.baseUrl}/contract/${id}`, payload, this.options)
      .toPromise()
  }

  // Styles
  getStylesByStore(id: string): Promise<Styles> {
    return this.http
      .get(`${this.baseUrl}/styles/${id}/store`, this.options)
      .toPromise()
      .then(
        (response: Styles) => response
      )
  }

  changeStyles(payload: Styles): Promise<any> {
    const id = payload.id
    delete payload.id
    delete payload.createdAt
    delete payload.updatedAt
    delete payload['storeId']
    return this.http
      .put(`${this.baseUrl}/styles/${id}`, payload, this.options)
      .toPromise()
  }

  // UserRequiremets
  getUserRequirementsByStore(id: string): Promise<UserRequirements> {
    return this.http
    .get(`${this.baseUrl}/userRequirements/${id}/store`, this.options)
    .toPromise()
    .then(
      (response: UserRequirements) => response
    )
  }

  changeUserRequirements(payload: UserRequirements): Promise<any> {
    const id = payload.id
    delete payload.id
    delete payload.createdAt
    delete payload.updatedAt
    delete payload['storeId']
    return this.http
      .put(`${this.baseUrl}/userRequirements/${id}`, payload, this.options)
      .toPromise()
  }
}
