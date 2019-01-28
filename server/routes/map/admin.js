const Router = require('koa-router')
const router = Router()
router.prefix('/admin')

//index
router.get('/', async (ctx, next) => {
  await ctx.render('admin')
})
module.exports = router