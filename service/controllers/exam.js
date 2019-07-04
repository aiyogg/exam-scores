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
    let { p = 1, l = 10, ticket = '' } = ctx.request.query
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
        result.msg = 'service err'
        console.error('exam - examList', err)
      }
    } else if (body.split(' ')[0] === '-ERR') {
      result.msg = body.split(' ')[1] || 'service err'
      console.warn('exam - examList', result.msg)
    } else {
      result.msg = body
      console.warn('exam - examList', body)
    }
    ctx.body = result
  },

  /**
   * 考试详情
   * @param {*} ctx
   * @param {*} next
   */
  async examInfo (ctx, next) {
    const { examGuid = '', ticket = '' } = ctx.request.query
    let result = {
      code: -1,
      msg: '',
      data: null
    }
    const reqJar = request.jar()
    const cookie = request.cookie(`7netticket=${ticket}`)
    reqJar.setCookie(cookie, config.api.baseUrl)
    const examReqOptions = {
      method: 'POST',
      uri: `${config.api.baseUrl}/scorereport/examInfo`,
      jar: reqJar,
      formData: {
        _septnet_document: JSON.stringify({ examGuid })
      },
      resolveWithFullResponse: true
    }
    /**
     * 科目成绩参数构造
     * @param {string} subject 科目名称
     */
    function subjectReqFac (subject) {
      return {
        method: 'POST',
        uri: `${config.api.baseUrl}/scorereport/subjectInfo`,
        jar: reqJar,
        formData: {
          _septnet_document: JSON.stringify({ examGuid, subject })
        }
      }
    }
    // let rspCookies = reqJar.getCookies(examReqOptions.uri)
    let { body } = await request(examReqOptions)
    if (body.split(' ')[0] === '+OK') {
      try {
        const {List: subjectList} = JSON.parse(body.substring(4))
        const subjects = subjectList.map(subjectInfo => subjectInfo.kmName)
        const subjectReps = subjectList.map((subjectInfo, i) => request(subjectReqFac(subjectInfo.kmName)))
        const {body: subjectRes} = await Promise.all(subjectReps)

        const examSubjectScores = {}
        subjectRes.forEach((subInfo, i) => {
          let [ok, resStr] = subInfo.split(' ')
          if (ok === '+OK' && resStr) {
            const subScores = JSON.parse(resStr) || []
            examSubjectScores[subjects[i]] = subScores.reduce((prev, curr) => ({
              socre: prev.score + curr.myScore,
              total: prev.total + curr.score
            }), {
              socre: 0,
              total: 0
            })
          }
        })
        result.code = 0
        result.data = examSubjectScores
      } catch (err) {
        result.msg = 'service err'
        console.error('exam - examList', err)
      }
    } else if (body.split(' ')[0] === '-ERR') {
      result.msg = body.split(' ')[1] || 'service err'
      console.warn('exam - examInfo', result.msg)
    } else {
      result.msg = body
      console.warn('exam - examInfo', body)
    }
    ctx.body = result
  }
}
