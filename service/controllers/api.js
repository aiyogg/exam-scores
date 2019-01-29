/**
 * @desc: 接口相关主逻辑
 * @author: Chuck <i@chenteng.me>
 */

const request = require('request')
// const tough = require('tough-cookie')
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
    const jar = request.jar()
    const reqOptions = {
      method: 'POST',
      uri: 'http://student-m.7net.cc/login',
      jar,
      formData: {
        _septnet_document: JSON.stringify({ Code: username, Pass: password })
      }
    }

    request(reqOptions, (err, response, body) => {
      var cookies = jar.getCookies(reqOptions.uri)
      console.log(err, response, body, cookies)
    })
    ctx.body = result
  }
}
