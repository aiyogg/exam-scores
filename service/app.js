/**
 * @desc: 七天网络学生成绩查询系统
 * @author: Chuck <i@chenteng.me>
 */

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')
const config = require('./config')

const routers = require('./routers/index')

const app = new Koa()

// form 表单解析 ctx.body
app.use(bodyParser())

// 初始化路由中间件
app.use(cors({
  methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
  origin: 'http://localhost:3000'
}))
app.use(routers.routes())
app.use(routers.allowedMethods())

app.listen(config.app.port)
console.log(`Server start at port: ${config.app.port}`)
