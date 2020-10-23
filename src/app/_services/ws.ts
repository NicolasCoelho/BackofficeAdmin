import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Authentication } from './authentication';

@Injectable()
export class Ws {

  //public base_url = 'http://divulgadoresdevelopment-env.eba-pnvfbnm3.sa-east-1.elasticbeanstalk.com';
  public base_url = 'http://localhost:3000';
  public store_id = '6c6455ece193d4d2';

  public headers = { headers: { authorization: null } }

  constructor(private http: HttpClient, private auth: Authentication) {
    this.headers.headers.authorization = this.auth.getToken()
  }

  /**
   * Get infos about system health
   */
  getHealth(): Promise<any> {
    return this.http.get(`${this.base_url}/systemhealth`).toPromise()
      .then(
        response => response
      )
  }

  /**
   * Get a simple token to verify origin
   */
  getToken(): Promise<any> {
    const id = this.store_id
    return this.http.post(`${this.base_url}/token`, { store_id: id }).toPromise()
      .then(
        (response:any) => {
          this.auth.setToken(response.token)
          return response
        }
      )
  }

  /**
   * Authenticate user
   */
  authenticate(username, password): Promise<any> {
    // TODO: Implemets axios interceptor to add headers automaticaly
    return this.http.post(`${this.base_url}/auth`, { username, password }, this.headers).toPromise()
      .then(
        response => {
          console.log(response)
        }
      )
  }

}
