# collectionLog - 日志收集服务

前端日志收集服务,服务端基于koa2,客户端引入相关js并加入相关参数即可.  

### 目前支持收集的日志类型:
1. 点击
2. 曝光
3. 错误日志
4. 直接发送钩子

### 即将支持:
5. pv记录
6. 其他事件

### demo启动  
安装完pagejson中的依赖后,启动koa服务在3001端口
```
npm run dev
```

### 将会收集到的字段:
```
  app: '',    // app名称
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
  type: '',   // 日志类型
  reg: '',    // region: 分类信息  
  pos: '',    // pos: 排序信息,小分类信息  
  ex: '',     // 额外信息,  
  now: '',    // 上报时间,  
  pvid: '',   // pvid
```

### 使用方法:  
1. html页面上加入script:  
**参数说明**:  
appid: 自定义一个appid给当前客户端  
app: 自定义一个app名称给当前客户端  
url: 发送收集信息到后台的url  
classifyType: 请求时url是否加上分类,如果开启则填classifyType=y,不开启则不加入该参数
```
<script src="/collectionLog.js?appid=123123&app=myapp&url=%2Fcollect" is-clog></script>
```

2. 在想收集的元素上加入对应class与属性  
**类名参数说明**:  
clog-click: 用于收集点击日志  
clog-visit: 用于收集曝光日志  
**属性参数说明**:  
clog: 必须要有此属性,用于判断该元素是否需要收集日志  
clog-region: 分类信息,字符串  
clog-pos: 排序信息/小分类信息,字符串  
clog-ex: 额外信息,字符串  
```
<div class="clog-click" 
      clog 
      clog-region="foo" 
      clog-pos="bar" 
      clog-ex="otherInfo">点击日志收集</div>

<div class="clog-visit" 
      clog 
      clog-region="foo" 
      clog-pos="bar" 
      clog-ex="otherInfo">曝光日志收集</div>
```

3. 手动调用发送钩子
```
window.__clog.sendLog(type, region, pos, pageX, pageY, extraInfo)
```