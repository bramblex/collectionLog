const Router = require('koa-router')
const router = Router()
const collect = require('./map/collect')
const admin = require('./map/admin')

//请求前过滤
router.use(async (ctx, next) => {
  ctx.response.saveData = {}
  if (ctx.request.method == 'GET') {
    ctx.request.body = ctx.request.query
  }
  console.log('>>> 请求数据: ' + String(JSON.stringify(ctx.request.body)));
  // console.log('>>> 请求数据: ', ctx.request.body);
  try {
    await next()
  } catch (err) {
    console.log('>>> 路由错误信息: ' + err)
    ctx.body = {
      code: 500,
      msg: 'SERVER_ERROR'
    }
  }
})

//路由注册
router.use(collect.routes(), collect.allowedMethods())
router.use(admin.routes(), admin.allowedMethods())

//请求后过滤(有next的情况下)
router.use((ctx, next) => {
  if (!ctx.body || ctx.body == {} || ctx.body == '') {
    ctx.body = {
      code: 0,
      msg: ok
    }
  }
})

module.exports = router
