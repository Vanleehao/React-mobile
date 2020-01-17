import {BaseApi} from './base'

const qs = require('qs')

class Http extends BaseApi {
  constructor(userId, token) {
    super()
    this.userId = 123
    this.token = 456
  }

  getData() {
    return this.get('/monitor/allMethods', {})
  }
}

export default new Http()