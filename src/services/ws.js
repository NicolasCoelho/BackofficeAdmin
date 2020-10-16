import axios from 'axios'
import auth from './auth'

/**
 * Class implements server comunication
 */
class Ws {

  constructor() {
    this.ajax = axios
    // Url de testes
    this.base_url = 'http://divulgadoresdevelopment-env.eba-pnvfbnm3.sa-east-1.elasticbeanstalk.com'
    this.store_id = '6c6455ece193d4d2'
  }

  /**
   * Get infos about system health
   */
  getHealth() {
    return this.ajax.get(`${this.base_url}/systemhealth`)
      .then(
        response => response.data
      )
  }

  /**
   * Get a simple token to verify origin
   */
  getToken() {
    const id = this.store_id
    return this.ajax.post(`${this.base_url}/token`, { store_id: id })
      .then(
        response => {
          // Do some logic if is needded
          if (response.status === 200) {
            auth.setToken(response.data.token)
          } else {
            throw new Error()
          }
          return response.data
        }
      )
  }

  /**
   * Authenticate user
   */
  authenticate(username, password) {
    // TODO: Implemets axios interceptor to add headers automaticaly
    return this.ajax.post(`${this.base_url}/auth`, { username, password }, this.getHeaders())
      .then(
        response => {
          if (response.status === 200) {
            auth.setToken(response.data.token)
          }
          return response.data
        }
      )
  }

  getHeaders() {
    return { headers: { authorization: localStorage.getItem('Token') } }
  }
}

export default new Ws()