const router = require('koa-router')()

//请求前过滤
// router.use(async (ctx, next) => {
// 	ctx.response.saveData = {}
// 	if (ctx.request.method == 'GET') {
// 		ctx.request.body = ctx.request.query
// 	}
// 	console.log('>>> 请求数据: ' + String(JSON.stringify(ctx.request.body)));
// 	// console.log('>>> 请求数据: ', ctx.request.body);
// 	try {
// 		await next()
// 	} catch (err) {
// 		console.log('>>> 路由错误信息: ' + err)
// 		ctx.body = koaUtil.responseTemplate(null, 'SERVER_ERROR')
// 	}
// })

router.get('/', async (ctx, next) => {
  console.log('请求')

  ctx.cookies.set('name', 'tobi')
  await ctx.render('index', {})
})

router.get('/test', async (ctx, next) => {
  console.log('请求')
  ctx.cookies.set('name', 'tobi')
  await ctx.render('index', {})
})

router.get('/collect', async (ctx, next) => {
  console.log('请求', ctx.request.query)
  ctx.body = 'ok'
})

module.exports = router
