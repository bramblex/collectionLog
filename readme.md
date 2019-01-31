# collectionLog - 日志收集服务

**简介**: 主要是有客户端引入js并初始化后,有加特殊className的元素在点击或者页面滚动后,客户端会发送一个请求到服务端,服务端把客户端发来的请求的参数存放到MongoDB或者其他数据库.  

**目前支持收集的日志类型**:
1. 点击
2. 曝光(仅监控Y轴滚动事件)
3. 错误日志
4. 直接发送钩子
5. pv记录

**将会收集到的字段**:
```
  appid: '',  // appid
  lang: '',   // 客户端语言
  os: '',     // 客户端操作系统
  ua: '',     // 浏览器ua
  bro: '',    // 浏览器类型
  broV: '',   // 浏览器版本
  w: 0,       // 显示屏宽度
  h: 0,       // 显示屏高度
  x: 0,       // 点击位置x
  y: 0,       // 点击位置y
  site: '',   // hostname
  href: '',   // 网站完整url
  spa: 'no',  // 是否带#号的spa
  uid: '',    // userid, 会取cookie/localstorage/sessionstorage中的uid字段
  stay: 0,    // 逗留时长
  type: '',   // 日志类型: click, visit, error
  reg: '',    // region: 分类信息  
  pos: '',    // pos: 排序信息, 小分类信息  
  ex: '',     // 额外信息  
  page: '',   // 页面名称
  now: '',    // 上报时间  
  pid: '',    // pv uuid  
```

---  
## **客户端相关**:

### 使用方法:  
1. 直接引入dist中的collectionLog.min.js,然后初始化即可  
备注: 如果没有dist,可以先运行: npm run client:build
```
<script src="collectionLog.min.js"></script>
```
2. 初始化
```
let appid = 'xxxxxxx'
let postUrl = 'http://127.0.0.1:3001'
window.__clog = new CollectionLog(appid, postUrl)
```
3. 在想收集的元素上加入对应class与属性  
**类名参数说明**:  
clog-click: 用于收集点击日志  
clog-visit: 用于收集曝光日志  
**属性参数说明**:  
clog: 必须要有此属性,用于判断该元素是否需要收集日志  
clog-region: 分类信息,字符串  
clog-pos: 排序信息/小分类信息,字符串  
clog-ex: 额外信息,字符串
clog-page: 页面名字,默认取document.title  
```
<div class="clog-click" 
      clog 
      clog-region="foo" 
      clog-pos="bar" 
      clog-page="some"  
      clog-ex="otherInfo">点击日志收集</div>

<div class="clog-visit" 
      clog 
      clog-region="foo" 
      clog-pos="bar" 
      clog-page="some"  
      clog-ex="otherInfo">曝光日志收集</div>
```

4. 其他内置方法
- **CollectionLog.sendLog**: 发送钩子
```
sendLog(type, region, pos, pageX, pageY, extraInfo, page)
```
- **CollectionLog.getDocumentVisit**: 立即发送可视范围内的曝光信息
```
getDocumentVisit()
```
- **CollectionLog.addScrollWatch**: 绑定某个内部滚动对象
```
addScrollWatch(element)
```
- **CollectionLog.addCustomEvent**: 绑定某个内部滚动对象
```
addCustomEvent(eventName, eventTarget)
```
---  
 
## **服务端相关**:  
**备注:** 本项目中简单地使用koa2 + MongoDB作为服务端,且配有后台管理页面.  如果有你自己喜欢的语言或者框架,可以使用自己的框架.

### **请求url**
1. /collect/click
2. /collect/visit
3. /collect/error

### **服务端启动**
```
npm run server
```
服务会在localhos:3001启动  
管理后台页面(未完成): localhos:3001/admin