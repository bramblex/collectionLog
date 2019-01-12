/**
 * 收集日志
 * 直接在所需页面上加入该js,
 * script标签上加上属性: is-clog
 * src上可加入参数 ?app=xxx&appid=xxx&url=xxx 用于记录数据
 * 上报的userId依次取cookie/localstorage/sessionstorage中的uid
 * */

//  构造函数
function CollectionLog() {
  this.initialTime = new Date().getTime()
  this.postUrl = ''
  this.options = {
    app: '',
    appid: '',
    lang: '',
    os: '',
    ua: '',
    bro: '',
    broV: '',
    w: 0,
    h: 0,
    site: '',
    href: '',
    spa: 'no',
    uid: '',
    stay: 0,
    uid: '',
  }
  var scripts = document.querySelector('script[is-clog]')
  if (scripts) {
    var args = this.formatUrl(scripts.src)
    this.postUrl = args.url
    this.options.app = args.app
    this.options.appid = args.appid
    this.initOptions()
  }
}

// 选择器
CollectionLog.prototype.$ = function (name) {
  return document.querySelector(name)
}

// 逗留时长
CollectionLog.prototype.getStayLong = function () {
  return (new Date().getTime() - this.initialTime)
}

// json2params
CollectionLog.prototype.formatOptions = function (options) {
  if (!options) {
    return ''
  }
  var params = '?'
  for (var i in options) {
    params += i
    params += '=' + (encodeURIComponent(options[i]) || '')
    params += '&'
  }
  params = params.substr(0, params.length - 1)
  return params
}

// params2json
CollectionLog.prototype.formatUrl = function (url) {
  var params = url.split('?')[1]
  var pairs = params.split("&")
  var args = new Object()
  for (var i = 0; i < pairs.length; i++) {
    var pos = pairs[i].indexOf('=')
    if (pos == -1) {
      continue
    }
    var argname = pairs[i].substring(0, pos)
    var value = pairs[i].substring(pos + 1)
    args[argname] = decodeURIComponent(value)
  }
  return args
}

// 检查浏览器版本
CollectionLog.prototype.checkBrowser = function () {
  var ua = String(navigator.userAgent).toLocaleLowerCase()
  var res = {
    browser: '',
    browserVersion: '',
  }
  if (/(micromessenger)|(windowswechat)/gi.test(ua)) {
    res.ua = 'wechat'
    return res
  }
  if (/chrome/gi.test(ua)) {
    res.browser = 'chrome'
    var exceRes = /chrome\/\w+/gi.exec(ua)
    var borwserVersion = (exceRes && exceRes.length > 0) ? (Number(exceRes[0].replace('chrome/', '')) || 0) : 0
    res.browserVersion = borwserVersion
    return res
  }
  if (/firefox/gi.test(ua)) {
    res.browser = 'firefox'
    var exceRes = /firefox\/\w+/gi.exec(ua)
    var borwserVersion = (exceRes && exceRes.length > 0) ? (Number(exceRes[0].replace('firefox/', '')) || 0) : 0
    res.browserVersion = borwserVersion
    return res
  }
  if (/(trident)|(mise)/gi.test(ua)) {
    res.browser = 'ie'
    return res
  }
  if (/edge/gi.test(ua)) {
    res.browser = 'edge'
    var exceRes = /edge\/\w+/gi.exec(ua)
    var borwserVersion = (exceRes && exceRes.length > 0) ? (Number(exceRes[0].replace('edge/', '')) || 0) : 0
    res.browserVersion = borwserVersion
    return res
  }
  return res
}

// 初始化基本数据
CollectionLog.prototype.initOptions = function () {
  this.options.lang = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || ""
  this.options.os = navigator.platform || ''
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
  var browser = this.checkBrowser()
  this.options.bro = browser.browser
  this.options.broV = browser.browserVersion

  this.addEvent()
}

// 加入事件监听
CollectionLog.prototype.addEvent = function () {
  var that = this
  // 点击事件
  document.body.removeEventListener('click', function () { })
  document.body.addEventListener('click', function (e) {
    var target = e.target
    if (target.attributes && target.attributes.clog && target.attributes.clog.value.indexOf('click') > -1) {
      that.clickLog(target)
    }
  })

  // 曝光事件
  document.removeEventListener('scroll', function () { })
  document.addEventListener('scroll', function (e) {
    // console.log(e)
  })

  // 错误事件
  window.removeEventListener('error', function () { })
  window.addEventListener('error', function (e) {
    console.log(e)
  })

}

// 点击上报
CollectionLog.prototype.clickLog = function (target) {
  console.dir(target.attributes)
  var region = target.attributes['clog-region'].value || ''
  var pos = target.attributes['clog-pos'].value || ''
  this.sendLog('click', region, pos)
}

// 曝光上报
CollectionLog.prototype.visitLog = function (target) {
  console.dir(target.attributes)
}

// xhr请求
CollectionLog.prototype.sendLog = function (type, region, pos) {
  // 获取uid
  if (!this.options.uid) {
    var cookie = document.cookie
    if (/uid=[\w\d-_=\.]+\;/i.test(document.cookie)) {
      var uidArr = document.cookie.match(/uid=[\w\d-_=\.]+\;/i)
      if (uidArr && uidArr.length) {
        this.options.uid = uidArr[0].replace('uid=', '').replace(';', '')
      }
    } else if (localStorage.getItem('uid')) {
      this.options.uid = localStorage.getItem('uid')
    } else if (sessionStorage.getItem('uid')) {
      this.options.uid = sessionStorage.getItem('uid')
    }
  }
  // url拼接
  var url = this.postUrl
  var tempOpt = { type: type || 'click' }
  for (var i in this.options) {
    tempOpt[i] = this.options[i]
  }
  tempOpt['stay'] = this.getStayLong()
  url += this.formatOptions(tempOpt)
  // 请求
  if (window.fetch) {
    fetch(url)
  } else if (1) {

  } else {

  }
  console.log(this.options)
}

// 窗口关闭监听
window.addEventListener('beforeunload', function (e) {
  console.log(e)
})

// 窗口打开监听
window.addEventListener('load', function () {
  window.__clog = new CollectionLog()
  console.log(__clog)

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