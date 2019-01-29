/**
 * @desc: 子路由集合
 * @author: Chuck <i@chenteng.me>
 */

const router = require('koa-router')()

const api = require('./api')

router.use('/api', api.routes())

module.exports = router
