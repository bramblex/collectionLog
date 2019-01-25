import util from './util'



class CollectionLog {
  initialTime: number
  postUrl: string
  options: any
  visitTags: any[]
  constructor(appId: string = '', postUrl: string = '') {
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
      x: 0,
      y: 0,
      site: '',
      href: '',
      spa: 'no',
      uid: '',
      stay: 0,
      type: '',
      reg: '',
      pos: '',
      ex: '',
      now: '',
      pid: '',
      page: ''
    }
    this.visitTags = []
    this.initOptions()
  }

  initOptions(): void {
    this.options.lang = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || ""
    this.options.os = navigator.platform || ''
    this.options.ua = navigator.userAgent || ''
    this.options.w = document.body.clientWidth || screen.availWidth || 0
    this.options.h = document.body.clientHeight || screen.availHeight || 0
    this.options.site = location.origin || location.host || ''
    this.options.href = location.href
    this.options.pid = util.generatePvId()
    if (location.href.indexOf('#/') > -1) {
      this.options.spa = 'yes'
    } else {
      this.options.spa = 'no'
    }
    let browser = util.checkBrowser()
    this.options.bro = browser.browser
    this.options.broV = browser.browserVersion
  }

  addEvent(): void {

  }
}

(<any>window).CollectionLog = CollectionLog

export { CollectionLog }