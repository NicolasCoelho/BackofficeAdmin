import { Injectable } from '@angular/core';

@Injectable()
export class Authentication {

  private token: string;

  constructor() {
    this.token = localStorage.getItem('Token')
  }

  getToken() {
    return this.token
  }

  setToken(token) {
    this.token = token
    localStorage.setItem('Token', token)
  }

  isAuthenticaded(): boolean {
    if (!this.hasToken()) return false
    const data = this.getTokenData()
    if (data.t === 1) return false
    return !this.isTokenExpired()
  }

  hasToken(): boolean {
    return (
      this.token !== null       &&
      this.token !== undefined  &&
      this.token !== ''
    )
  }

  getTokenData () {
    const tokenData = this.decode(this.token);
    return tokenData
  }

  isTokenExpired() {
    const data = this.getTokenData()
    return (Date.now().valueOf() / 1000) > data.exp
  }

  isEmptyTokenValid() {
    if (!this.hasToken()) return false
    return this.isTokenExpired()
  }

  decode(token: string) {
    const data = JSON.parse(atob(token.split('.')[1]))
    return data
  }

  deleteToken() {
    this.token = null
    localStorage.removeItem('Token')
  }
}
