const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.cookies.set('name', 'tobi')
  await ctx.render('index', {})
})

router.get('/test', async (ctx, next) => {
  ctx.cookies.set('name', 'tobi')
  await ctx.render('index', {})
})

router.get('/collect', async (ctx, next) => {
  ctx.body = 'ok'
})

module.exports = router
