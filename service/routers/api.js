/**
 * @desc: api 相关路由
 * @author: Chuck <i@chenteng.me>
 */

const router = require('koa-router')()
const userController = require('../controllers/user')
const examController = require('../controllers/exam')

const routers = router
  .post('/login', userController.userLogin)
  .get('/examList', examController.examList)

module.exports = routers
