/**
 * @desc: 考试相关接口逻辑
 * @author: Chuck <i@chenteng.me>
 */

const request = require('request-promise')
const _ = require('lodash')

module.exports = {
  /**
   * 考试记录
   * @param {*} ctx
   * @param {*} next
   */
  async examList (ctx, next) {
    let { p = 1, l = 10 } = ctx.query
    let result = {
      code: -1,
      msg: '',
      data: null
    }
    const reqJar = request.jar()
    const cookie = request.cookie('')
    reqJar.setCookie(cookie, 'http://student-m.7net.cc')
    const reqOptions = {
      method: 'POST',
      uri: 'http://student-m.7net.cc/Exam/claimExamList',
      jar: reqJar,
      formData: {
        _septnet_document: JSON.stringify({ viewIndex: p, viewLength: l, score: 1 })
      },
      resolveWithFullResponse: true
    }
    let rspCookies = reqJar.getCookies(reqOptions.uri)
    let { body } = await request(reqOptions)

    if (body.split(' ')[0] === '+OK') {
      try {
        const response = JSON.parse(body.substring(4))
        result.code = 0
        result.data = response
      } catch (err) {
        result.msg = 'Responses parse failed'
      }
    } else {
      result.msg = body
    }
    ctx.body = result
  }
}