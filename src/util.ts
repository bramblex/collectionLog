export default {
  /**
   * 生成pvid
   * */
  generatePvId(): string {
    let rnds: number[] = new Array(16)
    for (let i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff
    }

    rnds[6] = (rnds[6] & 0x0f) | 0x40
    rnds[8] = (rnds[8] & 0x3f) | 0x80
    let buf: string = ''
    for (let ii = 0; ii < 16; ii++) {
      let num = rnds[ii]
      if (ii % 4 == 0 && ii > 0) {
        buf += '-'
      }
      buf += num.toString(16)
    }
    return buf
  },
  /**
   * params2json
   * */
  params2json(url: string = ''): object {
    let params: string = url.split('?')[1]
    let pairs: string[] = params.split("&")
    let args: any = new Object()
    for (let i = 0; i < pairs.length; i++) {
      let pos = pairs[i].indexOf('=')
      if (pos == -1) {
        continue
      }
      let argname = pairs[i].substring(0, pos)
      let value = pairs[i].substring(pos + 1)
      args[argname] = decodeURIComponent(value)
    }
    return args
  },
  /**
   * json2params
   * */
  json2params(options: any = {}): string {
    if (!options) {
      return ''
    }
    let params: string = '?'
    for (let i in options) {
      params += i
      params += '=' + (encodeURIComponent(options[i]) || '')
      params += '&'
    }
    params = params.substr(0, params.length - 1)
    return params
  },
  /**
   * 逗留时长
   * */
  getStayLong(timeStamp: number = 0): number {
    let stay: number = Math.ceil((new Date().getTime() - timeStamp) / 1000)
    return stay
  },
  /**
   * 检查浏览器版本
   * */
  checkBrowser(): any {
    let ua: string = String(window.navigator.userAgent).toLocaleLowerCase()
    let res: any = {
      browser: '',
      browserVersion: '',
      isPhone: false
    }
    if (/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/gi.test(ua)) {
      res.isPhone = true
    }
    if (/(micromessenger)|(windowswechat)/gi.test(ua)) {
      res.browser = 'wechat'
      return res
    }
    if (/UCBrowser/gi.test(ua)) {
      res.browser = 'UCBrowser'
      return res
    }
    if (/QQBrowser/gi.test(ua)) {
      res.browser = 'QQBrowser'
      return res
    }
    if (/chrome/gi.test(ua)) {
      res.browser = 'chrome'
      let exceRes = /chrome\/\w+/gi.exec(ua)
      let borwserVersion = (exceRes && exceRes.length > 0) ? (Number(exceRes[0].replace('chrome/', '')) || 0) : 0
      res.browserVersion = borwserVersion
      return res
    }
    if (/firefox/gi.test(ua)) {
      res.browser = 'firefox'
      let exceRes = /firefox\/\w+/gi.exec(ua)
      let borwserVersion = (exceRes && exceRes.length > 0) ? (Number(exceRes[0].replace('firefox/', '')) || 0) : 0
      res.browserVersion = borwserVersion
      return res
    }
    if (/(trident)|(mise)/gi.test(ua)) {
      res.browser = 'ie'
      return res
    }
    if (/edge/gi.test(ua)) {
      res.browser = 'edge'
      let exceRes = /edge\/\w+/gi.exec(ua)
      let borwserVersion = (exceRes && exceRes.length > 0) ? (Number(exceRes[0].replace('edge/', '')) || 0) : 0
      res.browserVersion = borwserVersion
      return res
    }
    if (/version\/([\d.]+).*safari/gi.test(ua)) {
      res.browser = 'safari'
      return res
    }
    if (/opera/gi.test(ua)) {
      res.browser = 'opera'
      return res
    }
    if (/webkit/gi.test(ua)) {
      res.browser = 'webkit'
      return res
    }
    return res
  }
}