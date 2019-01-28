/**
 * 请求过滤中间件
 *  */

module.exports = function compose(middleware) {
  return async function (ctx, next) {
    if (ctx.request.method == 'GET') {
      ctx.request.body = ctx.request.query
    }
    await next().then(() => {
      console.log('>>> 请求数据: ' + String(JSON.stringify(ctx.request.body)))
    }).catch(err => {
      console.log('>>> 路由错误信息: ' + err)
      ctx.body = {
        code: 500,
        msg: 'SERVER_ERROR'
      }
    })
  }
}