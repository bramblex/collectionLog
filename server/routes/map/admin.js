const Router = require('koa-router')
const router = Router()
router.prefix('/admin')

//index
router.get('/', async (ctx, next) => {
  await ctx.render('admin')
})

// template
router.get('/template', async (ctx, next) => {
  if (ctx.request.body && ctx.request.body.name) {
    await ctx.render(decodeURIComponent(ctx.request.body.name))
  } else {
    ctx.status = 404
    ctx.body = {
      code: 404,
      msg: 'API_NOT_EXIST'
    }
  }
})

module.exports = router