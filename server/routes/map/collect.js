const Router = require('koa-router')
const router = Router()
const utils = require('../../util/util')
const LogModel = require('../../models/log')
const collectService = require('../../services/collect')
router.prefix('/collect')


//click
router.get('/click', async (ctx, next) => {
  // await collectService.saveCollect(ctx.request.body)
  let log = new LogModel(ctx.request.body)
  await log.save((err, res) => {
    if (err) {
      console.log(err, res)
    }
  })
  ctx.body = 'ok'
})

// visit
router.get('/visit', async (ctx, next) => {
  // await collectService.saveCollect(ctx.request.body)
  let logs = new Array((ctx.request.body.page || '').split(',').length)
  for (let i = 0; i < logs.length; i++) {
    logs[i] = Object.assign({}, ctx.request.body)
    logs[i]['reg'] = (ctx.request.body['reg'] || '').split(',')[i]
    logs[i]['pos'] = (ctx.request.body['pos'] || '').split(',')[i]
    logs[i]['ex'] = (ctx.request.body['ex'] || '').split(',')[i]
    logs[i]['page'] = (ctx.request.body['page'] || '').split(',')[i]
  }
  LogModel.insertMany(logs, (err, res) => {
    if (err) {
      console.log(err, res)
    }
  })
  ctx.body = 'ok'
})

// error
router.get('/error', async (ctx, next) => {
  // await collectService.saveCollect(ctx.request.body)
  let log = new LogModel(ctx.request.body)
  await log.save((err, res) => {
    if (err) {
      console.log(err, res)
    }
  })
  ctx.body = 'ok'
})

module.exports = router