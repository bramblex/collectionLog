const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const koaStatic = require('koa-static')
const routers = require('./routes')
const mongoose = require('mongoose')
const dbConfig = require('./config/db.config')

// mongodb
mongoose.connect(`mongodb://${dbConfig.uri}/${dbConfig.dbName}`, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('mongoose连接失败')
  } else {
    console.log('mongoose连接成功')
  }
})

// middlewares
app.use(cors())
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'html',
  map: { html: 'ejs' }
}))


// 路由
app.use(routers.routes(), routers.allowedMethods())

// 404
app.use((ctx) => {
  ctx.body = {
    code: 404,
    msg: 'API_NOT_EXIST'
  }
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

// error handler
onerror(app)

module.exports = app
