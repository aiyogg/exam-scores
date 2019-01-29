/**
 * @desc: 接口相关主逻辑
 * @author: Chuck <i@chenteng.me>
 */

const rp = require('request-promise')
const request = require('request')
const tough = require('tough-cookie')
const config = require('../config')

module.exports = {
    async userLogin (ctx) {
        let { username = '', password = '' } = ctx.request.body
        let result = {
            code: -1,
            message: '',
            formData: null
        }
        const rpOptions = {
            method: 'POST',
            uri: 'http://student-m.7net.cc/login',
            jar: true,
            formData: {
                _septnet_document: JSON.stringify({ Code: username, Pass: password })
            }
        }

        let loginRes = request(rpOptions, (err, response, body) => {
            console.log(err, response, body)
        })
        ctx.body = result
    }
}
