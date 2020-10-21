import { Injectable } from '@angular/core';

@Injectable()
export class Authentication {

  private token: string;

  constructor() {
    this.token = localStorage.getItem('token')
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
    try {
      const expDate = new Date(data.exp)
      return ( Date.now() > expDate.getTime() )
    } catch {
      return true
    }
  }

  isEmptyTokenValid() {
    if (!this.hasToken()) return false
    return this.isTokenExpired()
  }

  decode(token: string) {
    const data = JSON.parse(atob(token.split('.')[1]))
    return data
  }
}
