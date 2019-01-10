/**
 * 收集日志,前端js
 * */

function CollectionLog(url, storageType, storageName) {
  this.startTime = Date.now()
  this.url = url || '/collect'
  this.storageType = storageType || null
  this.storageName = storageName || null
  this.options = {
    app: '',
    lang: '',
    os: '',
    ua: '',
    w: 0,
    h: 0,
    site: '',
    href: '',
    spa: 'no',
    uid: '',
    stay: 0
  }
  this.initOptions()
  this.addEvent()
}

CollectionLog.prototype.$ = function (name) {
  return document.querySelector(name)
}

CollectionLog.prototype.getStayLong = function () {
  return Math.floor((Date.now() - this.startTime) / 1000)
}

CollectionLog.prototype.formatOptions = function (options) {
  if (!options) {
    return ''
  }
  let params = '?'
  for (var i in options) {
    params += i
    params += encodeURIComponent(options[i])
  }
  return params
}

CollectionLog.prototype.initOptions = function () {
  this.options.app = navigator.appName || ''
  this.options.lang = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || ""
  this.options.platform = navigator.platform || ''
  this.options.ua = navigator.userAgent || ''
  this.options.w = document.body.clientWidth || screen.availWidth || 0
  this.options.h = document.body.clientHeight || screen.availHeight || 0
  this.options.site = location.origin || location.host || ''
  this.options.href = location.href
  if (location.href.indexOf('#/') > -1) {
    this.options.spa = 'yes'
  } else {
    this.options.spa = 'no'
  }
}

CollectionLog.prototype.sendLog = function (options) {
  if (!options) {
    return
  }

}

CollectionLog.prototype.addEvent = function () {
  var that = this
  document.body.removeEventListener('click', function () { })
  document.body.addEventListener('click', function (e) {
    var target = e.target
    if (target.attributes && target.attributes.clog) {
      if (target.attributes.clog.value.indexOf('click') > -1) {
        that.clickLog(target)
      }
    }
  })
}

CollectionLog.prototype.clickLog = function (target) {
  console.dir(target.attributes)
}

CollectionLog.prototype.visitLog = function (target) {
  console.dir(target.attributes)
}

window.onload = function () {
  window.__clog = new CollectionLog()
  console.log(__clog)
}

window.addEventListener('beforeunload', function (e) {
  debugger
})

/**
  cc:0
  ck:1
  cl:24-bit
  ds:375x603
  vl:603
  ep:{"netAll":11,"netDns":0,"netTcp":0,"srv":13,"dom":370,"loadEvent":606}
  et:87
  ja:0
  ln:zh-cn
  lo:0
  lt:1547126021
  rnd:1763328410
  si:91de53dcd5c2a79232daa1c1b9387937
  su:http://h5.youyinian.cn/userNew/?!=
  v:1.2.38
  lv:2
**/