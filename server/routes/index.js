const Router = require('koa-router')
const router = Router()
const requestMiddleware = require('../middlewares/request')
const collect = require('./map/collect')
const admin = require('./map/admin')

//请求前过滤
router.use(requestMiddleware())

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
