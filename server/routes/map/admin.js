const Router = require('koa-router')
const router = Router()
router.prefix('/admin')

//click
router.get('/click', async (ctx, next) => {
  ctx.body = 'ok'
})

// visit
router.get('/visit', async (ctx, next) => {
  ctx.body = 'ok'
})

// error
router.get('/error', async (ctx, next) => {
  ctx.body = 'ok'
})

//index
router.get('/*', async (ctx, next) => {
  ctx.body = 'ok'
})
module.exports = router