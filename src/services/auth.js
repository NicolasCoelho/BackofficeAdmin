import jwt from "jsonwebtoken";

class Auth {
  constructor() {
    this.jwt = jwt
    this.token = localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('Token')
  }

  setToken(token) {
    this.token = token
    localStorage.setItem('Token', token)
  }

  isAuthenticaded() {
    if (!this.hasToken()) return false
    const data = this.getTokenData()
    console.log(data)
    if (data.t === 1) return false
    return !this.isTokenExpired()
  }

  hasToken() {
    this.setToken(localStorage.getItem('Token'))
    return (
      this.token !== null       &&
      this.token !== undefined  &&
      this.token !== ''
    )
  }

  getTokenData () {
    this.setToken(localStorage.getItem('Token'))
    const tokenData = this.jwt.decode(this.token);
    return tokenData
  }

  isTokenExpired() {
    this.setToken(localStorage.getItem('Token'))
    const data = this.getTokenData()
    try {
      const expDate = new Date(data.exp)
      return ( Date.now() > expDate )
    } catch {
      return true
    }
  }

  isEmptyTokenValid() {
    this.setToken(localStorage.getItem('Token'))
    if (!this.hasToken()) return false
    return this.isTokenExpired()
  }
}

export default new Auth()