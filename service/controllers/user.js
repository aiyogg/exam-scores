/**
 * @desc: 用户相关接口逻辑
 * @author: Chuck <i@chenteng.me>
 */

const request = require('request-promise')
const _ = require('lodash')
const config = require('../config')

module.exports = {
  /**
   * 登录
   * @param {*} ctx
   * @param {*} next
   */
  async userLogin (ctx, next) {
    let { username = '', password = '' } = ctx.request.body
    let result = {
      code: -1,
      msg: '',
      data: null
    }
    const reqJar = request.jar()
    const reqOptions = {
      method: 'POST',
      uri: `${config.api.baseUrl}/login`,
      jar: reqJar,
      formData: {
        _septnet_document: JSON.stringify({ Code: username, Pass: password })
      },
      resolveWithFullResponse: true
    }
    let { body } = await request(reqOptions)
    let loginCookies = reqJar.getCookies(reqOptions.uri)

    if (body.split(' ')[0] === '+OK') {
      let ticket = _.find(loginCookies, { key: '7netticket' }).value

      result.code = 0
      result.data = { ticket }
    } else if (body.split(' ')[0] === '-ERR') {
      result.msg = body.split(' ')[1] || 'service err'
      console.warn('user - userLogin', result.msg)
    } else {
      result.msg = body
      console.warn('user - userLogin', body)
    }
    ctx.body = result
  }
}
