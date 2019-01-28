/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar util_1 = __webpack_require__(/*! ./util */ \"./src/util.ts\");\n\nvar CollectionLog =\n/** @class */\nfunction () {\n  function CollectionLog(appId, postUrl) {\n    if (appId === void 0) {\n      appId = '';\n    }\n\n    if (postUrl === void 0) {\n      postUrl = '';\n    }\n\n    this.initialTime = new Date().getTime();\n    this.postUrl = postUrl;\n    this.options = {\n      appid: appId,\n      lang: '',\n      os: '',\n      ua: '',\n      bro: '',\n      broV: '',\n      w: 0,\n      h: 0,\n      x: 0,\n      y: 0,\n      site: '',\n      href: '',\n      spa: 'no',\n      uid: '',\n      stay: 0,\n      type: '',\n      reg: '',\n      pos: '',\n      ex: '',\n      now: '',\n      pid: '',\n      page: ''\n    };\n    this.windowHeight = window.innerHeight || window.screen.availHeight || 0;\n    this.visitTags = document.querySelectorAll('.clog-visit') || [];\n    this.isCanPost = true;\n    this.initOptions();\n  }\n\n  CollectionLog.prototype.initOptions = function () {\n    this.options.lang = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || \"\";\n    this.options.os = navigator.platform || '';\n    this.options.ua = navigator.userAgent || '';\n    this.options.w = document.body.clientWidth || screen.availWidth || 0;\n    this.options.h = document.body.clientHeight || screen.availHeight || 0;\n    this.options.site = location.origin || location.host || '';\n    this.options.href = location.href;\n    this.options.pid = util_1.default.generatePvId();\n\n    if (location.href.indexOf('#/') > -1) {\n      this.options.spa = 'yes';\n    } else {\n      this.options.spa = 'no';\n    }\n\n    var browser = util_1.default.checkBrowser();\n    this.options.bro = browser.browser;\n    this.options.broV = browser.browserVersion;\n    this.addEvent();\n  };\n\n  CollectionLog.prototype.addEvent = function () {\n    var that = this;\n    var timer = null; // dom节点变化\n\n    document.removeEventListener('DOMSubtreeModified', function () {});\n    document.addEventListener('DOMSubtreeModified', function (e) {\n      var visitTags = document.querySelectorAll('.clog-visit');\n\n      if (visitTags.length != that.visitTags.length) {\n        that.visitTags = visitTags;\n      }\n    }); // 点击事件\n\n    document.body.removeEventListener('click', function () {});\n    document.body.addEventListener('click', function (e) {\n      if (e.target.className.indexOf('clog-click') > -1) {\n        that.clickLog(e);\n      }\n    }); // 曝光事件\n\n    document.removeEventListener('scroll', function () {});\n    document.addEventListener('scroll', function (e) {\n      if (timer) {\n        clearTimeout(timer);\n        timer = setTimeout(function () {\n          afterTimmer();\n        }, 500);\n      } else {\n        afterTimmer();\n      }\n\n      function afterTimmer() {\n        timer = setTimeout(function () {\n          var visitTags = document.querySelectorAll('.clog-visit');\n\n          if (visitTags.length) {\n            that.visitLog(e);\n          }\n        }, 500);\n      }\n    }); // 错误事件\n\n    window.removeEventListener('error', function () {});\n    window.addEventListener('error', function (e) {\n      that.errorLog({\n        msg: e.message || 'no message',\n        file: e.filename || 'no file'\n      });\n    }, true);\n    window.removeEventListener('unhandledrejection', function () {});\n    window.addEventListener('unhandledrejection', function (e) {\n      that.errorLog({\n        msg: e.reason || 'no message',\n        file: e.target && e.target.name || 'no file'\n      });\n    }, true);\n  }; // 点击上报\n\n\n  CollectionLog.prototype.clickLog = function (e) {\n    var target = e.target;\n    var region = target.getAttribute('clog-region') || 'none';\n    var pos = target.getAttribute('clog-pos') || 'none';\n    var pageX = e.pageX || 'none';\n    var pageY = e.pageY || 'none';\n    var extraInfo = target.getAttribute('clog-ex') || 'none';\n    var page = target.getAttribute('clog-page') || document.title || 'none';\n    this.sendLog('click', region, pos, pageX, pageY, extraInfo, page);\n  }; // 曝光上报\n\n\n  CollectionLog.prototype.visitLog = function (e) {\n    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || document.scrollingElement.scrollTop || 0; // let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || document.scrollingElement.scrollHeight || 0;\n\n    var hasVisit = false;\n    var result = {\n      region: '',\n      pos: '',\n      pageX: '0',\n      pageY: scrollTop.toString(),\n      extraInfo: '',\n      page: ''\n    };\n\n    for (var i = 0; i < this.visitTags.length; i++) {\n      var tag = this.visitTags[i];\n\n      if (scrollTop <= tag.offsetTop + tag.offsetHeight && scrollTop + this.windowHeight >= tag.offsetTop + tag.offsetHeight) {\n        hasVisit = true;\n        var region = tag.getAttribute('clog-region') || 'none';\n        var pos = tag.getAttribute('clog-pos') || 'none'; // let pageX = 0\n        // let pageY = scrollTop\n\n        var extraInfo = tag.getAttribute('clog-ex') || 'none';\n        var page = tag.getAttribute('clog-page') || document.title || 'none';\n        result.region += region + ',';\n        result.pos += pos + ','; // result.pageX.push(pageX)\n        // result.pageY.push(pageY)\n\n        result.extraInfo += extraInfo + ',';\n        result.page += page + ',';\n      }\n    }\n\n    if (hasVisit) {\n      result.region = result.region.substr(0, result.region.length - 1);\n      result.pos = result.pos.substr(0, result.pos.length - 1);\n      result.extraInfo = result.extraInfo.substr(0, result.extraInfo.length - 1);\n      result.page = result.page.substr(0, result.page.length - 1);\n      this.sendLog('visit', result.region, result.pos, result.pageX, result.pageY, result.extraInfo, result.page);\n    }\n  }; // 错误上报\n\n\n  CollectionLog.prototype.errorLog = function (obj) {\n    var extraInfo = '';\n\n    if (obj) {\n      extraInfo += 'msg:' + obj.msg;\n      extraInfo += ';file:' + obj.file;\n    }\n\n    var page = document.title || '';\n    this.sendLog('error', 'error', '', '', '', extraInfo, page);\n  }; // xhr请求\n\n\n  CollectionLog.prototype.sendLog = function (type, region, pos, pageX, pageY, extraInfo, page) {\n    var _this = this; // 判断this.isCanPost\n\n\n    if (!this.isCanPost) {\n      return;\n    } // 获取uid\n\n\n    if (!this.options.uid) {\n      var cookie = document.cookie;\n\n      if (/uid=[\\w\\d-_=\\.]+\\;/i.test(document.cookie)) {\n        var uidArr = document.cookie.match(/uid=[\\w\\d-_=\\.]+\\;/i);\n\n        if (uidArr && uidArr.length) {\n          this.options.uid = uidArr[0].replace('uid=', '').replace(';', '') || '';\n        }\n      } else if (localStorage.getItem('uid')) {\n        this.options.uid = localStorage.getItem('uid') || '';\n      } else if (sessionStorage.getItem('uid')) {\n        this.options.uid = sessionStorage.getItem('uid') || '';\n      }\n    } // url拼接\n\n\n    var tempOpt = Object.assign({}, this.options);\n    var url = this.postUrl + (\"/collect/\" + type);\n    tempOpt['stay'] = util_1.default.getStayLong(this.initialTime);\n    tempOpt['type'] = type || '';\n    tempOpt['reg'] = region || '';\n    tempOpt['pos'] = pos || '';\n    tempOpt['x'] = pageX || '';\n    tempOpt['y'] = pageY || '';\n    tempOpt['ex'] = extraInfo || '';\n    tempOpt['page'] = page || '';\n    tempOpt['now'] = new Date().getTime();\n    url += util_1.default.json2params(tempOpt); // 请求\n\n    if (window.fetch) {\n      fetch(url, {\n        method: 'GET',\n        headers: new Headers({// 'Collection-log': 'true'\n        })\n      }).catch(function (err) {\n        _this.isCanPost = false;\n        setTimeout(function () {\n          _this.isCanPost = true;\n        }, 5000);\n      });\n    } else if (window.XMLHttpRequest) {\n      var oReq_1 = new XMLHttpRequest();\n\n      oReq_1.onload = function () {\n        oReq_1 = null;\n      };\n\n      oReq_1.onerror = function () {\n        _this.isCanPost = false;\n        setTimeout(function () {\n          _this.isCanPost = true;\n        }, 5000);\n        oReq_1 = null;\n      };\n\n      oReq_1.open(\"GET\", url);\n      oReq_1.send();\n    } else {\n      var img_1 = new Image();\n      img_1.src = url;\n\n      img_1.onload = function () {\n        img_1 = null;\n      };\n\n      img_1.onerror = function () {\n        img_1 = null;\n      };\n    }\n  };\n\n  return CollectionLog;\n}();\n\nexports.CollectionLog = CollectionLog;\nwindow.CollectionLog = CollectionLog;\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = {\n  /**\n   * 生成pvid\n   * */\n  generatePvId: function generatePvId() {\n    var rnds = new Array(16);\n\n    for (var i = 0, r = void 0; i < 16; i++) {\n      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;\n      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;\n    }\n\n    rnds[6] = rnds[6] & 0x0f | 0x40;\n    rnds[8] = rnds[8] & 0x3f | 0x80;\n    var buf = '';\n\n    for (var ii = 0; ii < 16; ii++) {\n      var num = rnds[ii];\n\n      if (ii % 4 == 0 && ii > 0) {\n        buf += '-';\n      }\n\n      buf += num.toString(16);\n    }\n\n    return buf;\n  },\n\n  /**\n   * params2json\n   * */\n  params2json: function params2json(url) {\n    if (url === void 0) {\n      url = '';\n    }\n\n    var params = url.split('?')[1];\n    var pairs = params.split(\"&\");\n    var args = new Object();\n\n    for (var i = 0; i < pairs.length; i++) {\n      var pos = pairs[i].indexOf('=');\n\n      if (pos == -1) {\n        continue;\n      }\n\n      var argname = pairs[i].substring(0, pos);\n      var value = pairs[i].substring(pos + 1);\n      args[argname] = decodeURIComponent(value);\n    }\n\n    return args;\n  },\n\n  /**\n   * json2params\n   * */\n  json2params: function json2params(options) {\n    if (options === void 0) {\n      options = {};\n    }\n\n    if (!options) {\n      return '';\n    }\n\n    var params = '?';\n\n    for (var i in options) {\n      params += i;\n      params += '=' + (encodeURIComponent(options[i]) || '');\n      params += '&';\n    }\n\n    params = params.substr(0, params.length - 1);\n    return params;\n  },\n\n  /**\n   * 逗留时长\n   * */\n  getStayLong: function getStayLong(timeStamp) {\n    if (timeStamp === void 0) {\n      timeStamp = 0;\n    }\n\n    var stay = Math.ceil((new Date().getTime() - timeStamp) / 1000);\n    return stay;\n  },\n\n  /**\n   * 检查浏览器版本\n   * */\n  checkBrowser: function checkBrowser() {\n    var ua = String(window.navigator.userAgent).toLocaleLowerCase();\n    var res = {\n      browser: '',\n      browserVersion: ''\n    };\n\n    if (/(micromessenger)|(windowswechat)/gi.test(ua)) {\n      res.browser = 'wechat';\n      return res;\n    }\n\n    if (/UCBrowser/gi.test(ua)) {\n      res.browser = 'UCBrowser';\n      return res;\n    }\n\n    if (/QQBrowser/gi.test(ua)) {\n      res.browser = 'QQBrowser';\n      return res;\n    }\n\n    if (/chrome/gi.test(ua)) {\n      res.browser = 'chrome';\n      var exceRes = /chrome\\/\\w+/gi.exec(ua);\n      var borwserVersion = exceRes && exceRes.length > 0 ? Number(exceRes[0].replace('chrome/', '')) || 0 : 0;\n      res.browserVersion = borwserVersion;\n      return res;\n    }\n\n    if (/firefox/gi.test(ua)) {\n      res.browser = 'firefox';\n      var exceRes = /firefox\\/\\w+/gi.exec(ua);\n      var borwserVersion = exceRes && exceRes.length > 0 ? Number(exceRes[0].replace('firefox/', '')) || 0 : 0;\n      res.browserVersion = borwserVersion;\n      return res;\n    }\n\n    if (/(trident)|(mise)/gi.test(ua)) {\n      res.browser = 'ie';\n      return res;\n    }\n\n    if (/edge/gi.test(ua)) {\n      res.browser = 'edge';\n      var exceRes = /edge\\/\\w+/gi.exec(ua);\n      var borwserVersion = exceRes && exceRes.length > 0 ? Number(exceRes[0].replace('edge/', '')) || 0 : 0;\n      res.browserVersion = borwserVersion;\n      return res;\n    }\n\n    if (/version\\/([\\d.]+).*safari/gi.test(ua)) {\n      res.browser = 'safari';\n      return res;\n    }\n\n    if (/opera/gi.test(ua)) {\n      res.browser = 'opera';\n      return res;\n    }\n\n    if (/webkit/gi.test(ua)) {\n      res.browser = 'webkit';\n      return res;\n    }\n\n    return res;\n  }\n};\n\n//# sourceURL=webpack:///./src/util.ts?");

/***/ })

/******/ });