/**
 * @desc: 考试相关接口逻辑
 * @author: Chuck <i@chenteng.me>
 */

const request = require('request-promise')
const _ = require('lodash')
const config = require('../config')

module.exports = {
  /**
   * 考试记录
   * @param {*} ctx
   * @param {*} next
   */
  async examList (ctx, next) {
    let { p = 1, l = 10, ticket = '' } = ctx.request.body
    let result = {
      code: -1,
      msg: '',
      data: null
    }
    const reqJar = request.jar()
    const cookie = request.cookie(`7netticket=${ticket}`)
    reqJar.setCookie(cookie, config.api.baseUrl)
    const reqOptions = {
      method: 'POST',
      uri: `${config.api.baseUrl}/Exam/claimExamList`,
      jar: reqJar,
      formData: {
        _septnet_document: JSON.stringify({ viewIndex: p, viewLength: l, score: 1 })
      },
      resolveWithFullResponse: true
    }
    // let rspCookies = reqJar.getCookies(reqOptions.uri)
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
  },
  async examInfo (ctx, next) {
    const { examGuid = '', ticket = '' } = ctx.request.body
    let result = {
      code: -1,
      msg: '',
      data: null
    }
    const reqJar = request.jar()
    const cookie = request.cookie(`7netticket=${ticket}`)
    reqJar.setCookie(cookie, config.api.baseUrl)
    const reqOptions = {
      method: 'POST',
      uri: `${config.api.baseUrl}/scorereport/examInfo`,
      jar: reqJar,
      formData: {
        _septnet_document: JSON.stringify({ examGuid })
      },
      resolveWithFullResponse: true
    }
    // let rspCookies = reqJar.getCookies(reqOptions.uri)
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
