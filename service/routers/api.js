/**
 * @desc: api 相关路由
 * @author: Chuck <i@chenteng.me>
 */

const router = require('koa-router')()
const apiController = require('../controllers/api')

const routers = router
    .post('/login', apiController.userLogin)

module.exports = routers
