import util from './util'



class CollectionLog {
  initialTime: number
  postUrl: string
  options: any
  visitTags: NodeList
  windowWidth: number
  windowHeight: number
  isCanPost: boolean
  isPhone: boolean
  extraScrollWatchElements: any
  constructor(appId: string = '', postUrl: string = '') {
    this.initialTime = new Date().getTime()
    this.postUrl = postUrl
    this.options = {
      appid: appId,
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
      page: '',
      isPhone: false
    }
    this.windowWidth = window.innerWidth || window.screen.availWidth || 0
    this.windowHeight = window.innerHeight || window.screen.availHeight || 0
    this.visitTags = document.querySelectorAll('.clog-visit') || (<any>[])
    this.isCanPost = true
    this.isPhone = false
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
    this.options.isPhone = browser.isPhone
    this.isPhone = browser.isPhone
    this.extraScrollWatchElements = []
    this.addEvent()
  }

  addEvent(): void {
    let that = this
    let timer: any = null

    // dom节点变化
    document.removeEventListener('DOMSubtreeModified', function () { })
    document.addEventListener('DOMSubtreeModified', function (e: any) {
      let visitTags = document.querySelectorAll('.clog-visit')
      if (visitTags.length != that.visitTags.length) {
        that.visitTags = visitTags
      }
    })

    // 点击事件
    document.body.removeEventListener('click', function () { })
    document.body.addEventListener('click', function (e: any) {
      if (e.target.className.indexOf('clog-click') > -1) {
        that.clickLog(e)
      }
    })

    // 触摸事件
    // document.body.removeEventListener('touchend', function () { })
    // document.body.addEventListener('touchend', function (e: any) {
    //   if (e.target.className.indexOf('clog-click') > -1) {
    //     that.clickLog(e)
    //   }
    // })

    // 曝光事件
    document.removeEventListener('scroll', function () { })
    document.addEventListener('scroll', function (e: any) {
      if (timer) {
        clearTimeout(timer)
        afterTimmer()
      } else {
        afterTimmer()
      }

      function afterTimmer() {
        timer = setTimeout(function () {
          let visitTags = document.querySelectorAll('.clog-visit')
          if (visitTags.length) {
            that.visitLog(e)
          }
        }, 500)
      }

    })

    // 错误事件
    window.removeEventListener('error', function () { })
    window.addEventListener('error', function (e: any) {
      that.errorLog({
        msg: e.message || 'no message',
        file: e.filename || 'no file'
      })
    }, true)
    window.removeEventListener('unhandledrejection', function () { })
    window.addEventListener('unhandledrejection', function (e: any) {
      that.errorLog({
        msg: e.reason || 'no message',
        file: e.target && e.target.name || 'no file'
      })
    }, true)
  }

  // 点击上报
  clickLog(e: any): void {
    let target = e.target
    let region = target.getAttribute('clog-region') || 'none'
    let pos = target.getAttribute('clog-pos') || 'none'
    let pageX = e.pageX || 'none'
    let pageY = e.pageY || 'none'
    let extraInfo = target.getAttribute('clog-ex') || 'none'
    let page = target.getAttribute('clog-page') || document.title || 'none'
    this.sendLog('click', region, pos, pageX, pageY, extraInfo, page)
  }

  // 曝光上报
  visitLog(e: any): void {
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || document.scrollingElement.scrollTop || 0;
    // let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || document.scrollingElement.scrollHeight || 0;
    let hasVisit = false
    let result = {
      region: '',
      pos: '',
      pageX: '0',
      pageY: scrollTop.toString(),
      extraInfo: '',
      page: ''
    }
    for (let i = 0; i < this.visitTags.length; i++) {
      let tag: any = this.visitTags[i]
      if ((scrollTop <= (tag.offsetTop + tag.offsetHeight)) && ((scrollTop + this.windowHeight) >= (tag.offsetTop + tag.offsetHeight))) {
        hasVisit = true

        let region = tag.getAttribute('clog-region') || 'none'
        let pos = tag.getAttribute('clog-pos') || 'none'
        // let pageX = 0
        // let pageY = scrollTop
        let extraInfo = tag.getAttribute('clog-ex') || 'none'
        let page = tag.getAttribute('clog-page') || document.title || 'none'
        result.region += (region + ',')
        result.pos += (pos + ',')
        // result.pageX.push(pageX)
        // result.pageY.push(pageY)
        result.extraInfo += (extraInfo + ',')
        result.page += (page + ',')
      }
    }
    if (hasVisit) {
      result.region = result.region.substr(0, result.region.length - 1)
      result.pos = result.pos.substr(0, result.pos.length - 1)
      result.extraInfo = result.extraInfo.substr(0, result.extraInfo.length - 1)
      result.page = result.page.substr(0, result.page.length - 1)
      this.sendLog('visit', result.region, result.pos, result.pageX, result.pageY, result.extraInfo, result.page)
    }
  }

  // 错误上报
  errorLog(obj: any): void {
    let extraInfo = ''
    if (obj) {
      extraInfo += ('msg:' + obj.msg)
      extraInfo += (';file:' + obj.file)
    }
    let page = document.title || ''
    this.sendLog('error', 'error', '', '', '', extraInfo, page)
  }

  // xhr请求
  sendLog(type: string, region: string, pos: string, pageX: string, pageY: string, extraInfo: string, page: string): void {
    // 判断this.isCanPost
    if (!this.isCanPost) {
      return
    }

    // 获取uid
    if (!this.options.uid) {
      let cookie = document.cookie
      if (/uid=[\w\d-_=\.]+\;/i.test(document.cookie)) {
        let uidArr = document.cookie.match(/uid=[\w\d-_=\.]+\;/i)
        if (uidArr && uidArr.length) {
          this.options.uid = uidArr[0].replace('uid=', '').replace(';', '') || ''
        }
      } else if (localStorage.getItem('uid')) {
        this.options.uid = localStorage.getItem('uid') || ''
      } else if (sessionStorage.getItem('uid')) {
        this.options.uid = sessionStorage.getItem('uid') || ''
      }
    }
    // url拼接
    let tempOpt: any = Object.assign({}, this.options)
    let url: string = this.postUrl + `/collect/${type}`
    tempOpt['stay'] = util.getStayLong(this.initialTime)
    tempOpt['type'] = type || ''
    tempOpt['reg'] = region || ''
    tempOpt['pos'] = pos || ''
    tempOpt['x'] = pageX || ''
    tempOpt['y'] = pageY || ''
    tempOpt['ex'] = extraInfo || ''
    tempOpt['page'] = page || ''
    tempOpt['now'] = new Date().getTime()
    url += util.json2params(tempOpt)
    // 请求
    if (window.fetch) {
      fetch(url, {
        method: 'GET',
        headers: new Headers({
          // 'Collection-log': 'true'
        })
      }).catch(err => {
        this.isCanPost = false
        setTimeout(() => {
          this.isCanPost = true
        }, 5000)
      })
    } else if ((<any>window).XMLHttpRequest) {
      let oReq = new XMLHttpRequest()
      oReq.onload = () => {
        oReq = null
      }
      oReq.onerror = () => {
        this.isCanPost = false
        setTimeout(() => {
          this.isCanPost = true
        }, 5000)
        oReq = null
      }
      oReq.open("GET", url)
      oReq.send()
    } else {
      let img = new Image()
      img.src = url
      img.onload = function () {
        img = null
      }
      img.onerror = function () {
        img = null
      }
    }
  }

  // 获取页面上显示的元素
  getDocumentVisit(): void {
    this.visitLog(null)
  }

  // 绑定某个内部滚动对象
  addScrollWatch(): void {
    let element: any = null
    if (!arguments[0]) {
      throw new Error('初始化绑定选元素失败,无输入元素')
      return
    }
    if (typeof arguments[0] == 'string') {
      element = document.querySelector(arguments[0])
    } else {
      element = arguments[0]
    }
    let id = element.id || ''
    let className = element.className || ''
    if (!(id + className)) {
      throw new Error('初始化绑定选元素失败,所选元素没有id和class')
      return
    }
    id = id ? '#' + id : ''
    className = className ? '.' + className : ''

    if (this.extraScrollWatchElements.includes(id + className)) {
      return
    } else {
      this.extraScrollWatchElements.push(id + className)
    }

    let timer: any = null
    let that = this
    element.addEventListener('scroll', (e: any) => {
      if (timer) {
        clearTimeout(timer)
        afterTimmer(e)
      } else {
        afterTimmer(e)
      }

      function afterTimmer(e: any) {
        timer = setTimeout(function () {
          let visitTags = document.querySelectorAll(id + className + ' .clog-visit')
          if (visitTags.length) {
            let scrollTop = element.scrollTop || 0;
            let hasVisit = false
            let result = {
              region: '',
              pos: '',
              pageX: '0',
              pageY: scrollTop.toString(),
              extraInfo: '',
              page: ''
            }
            let fatherTop = element.scrollTop
            let fatherHeight = element.clientHeight
            for (let i = 0; i < visitTags.length; i++) {
              let tag: any = visitTags[i]
              if ((fatherTop <= (tag.offsetTop + tag.offsetHeight)) && ((fatherTop + fatherHeight) >= (tag.offsetTop + tag.offsetHeight))) {
                hasVisit = true

                let region = tag.getAttribute('clog-region') || 'none'
                let pos = tag.getAttribute('clog-pos') || 'none'
                // let pageX = 0
                // let pageY = scrollTop
                let extraInfo = tag.getAttribute('clog-ex') || 'none'
                let page = tag.getAttribute('clog-page') || document.title || 'none'
                result.region += (region + ',')
                result.pos += (pos + ',')
                // result.pageX.push(pageX)
                // result.pageY.push(pageY)
                result.extraInfo += (extraInfo + ',')
                result.page += (page + ',')
              }
            }
            if (hasVisit) {
              result.region = result.region.substr(0, result.region.length - 1)
              result.pos = result.pos.substr(0, result.pos.length - 1)
              result.extraInfo = result.extraInfo.substr(0, result.extraInfo.length - 1)
              result.page = result.page.substr(0, result.page.length - 1)
              that.sendLog('visit', result.region, result.pos, result.pageX, result.pageY, result.extraInfo, result.page)
            }

          }
        }, 500)
      }

    })
  }

  // 添加自定义事件
  addCustomEvent(eventName: string = '', eventTarget: any = null): void {
    if (!eventName || !eventTarget) {
      throw new Error('初始化绑定选元素失败,无输入元素')
      return
    }
    if (typeof eventTarget == 'string') {
      eventTarget = document.querySelector(eventName)
    }
    eventTarget.addEventListener(eventName, (e: any) => {
      let target = e.target
      let region = target.getAttribute('clog-region') || 'none'
      let pos = target.getAttribute('clog-pos') || 'none'
      let pageX = e.pageX || 'none'
      let pageY = e.pageY || 'none'
      let extraInfo = target.getAttribute('clog-ex') || 'none'
      let page = target.getAttribute('clog-page') || document.title || 'none'
      this.sendLog('custom', region, pos, pageX, pageY, extraInfo, page)
    })
  }

}

(<any>window).CollectionLog = CollectionLog

export { CollectionLog }