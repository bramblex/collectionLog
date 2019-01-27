const mongoose = require('mongoose')
const Schema = mongoose.Schema
const logSchema = new Schema(
  {
    appid: { type: String, default: '' },
    lang: { type: String, default: '' },
    os: { type: String, default: '' },
    ua: { type: String, default: '' },
    bro: { type: String, default: '' },
    broV: { type: String, default: '' },
    w: { type: Number, default: 0 },
    h: { type: Number, default: 0 },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    site: { type: String, default: '' },
    href: { type: String, default: '' },
    spa: { type: String, default: Date.now },
    uid: { type: String, default: '' },
    stay: { type: Number, default: 0 },
    type: { type: String, default: '' },
    reg: { type: String, default: '' },
    pos: { type: String, default: '' },
    ex: { type: String, default: '' },
    now: { type: String, default: '' },
    pid: { type: String, default: '' },
    page: { type: String, default: '' },
    createTime: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
)

const LogModel = mongoose.model('log', logSchema)


module.exports = LogModel