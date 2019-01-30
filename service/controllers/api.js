/**
 * @desc: 接口相关主逻辑
 * @author: Chuck <i@chenteng.me>
 */

const request = require('request-promise')
const tough = require('tough-cookie')
const _ = require('lodash')
// const Cookie = tough.Cookie
// const CookieJar = tough.CookieJar
// const config = require('../config')

module.exports = {
  async userLogin (ctx) {
    let { username = '', password = '' } = ctx.request.body
    let result = {
      code: -1,
      message: '',
      data: null
    }
    const reqJar = request.jar()
    const reqOptions = {
      method: 'POST',
      uri: 'http://student-m.7net.cc/login',
      jar: reqJar,
      formData: {
        _septnet_document: JSON.stringify({ Code: username, Pass: password })
      },
      resolveWithFullResponse: true
    }
    let { body } = await request(reqOptions)
    let loginCookies = reqJar.getCookies(reqOptions.uri)

    if (body.split(' ')[0] === '+OK') {
      let ticket = _.find(loginCookies, {key: '7netticket'}).value
      result.data = { ticket }
    }
    ctx.body = result
  }
}
