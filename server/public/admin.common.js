console.warn('该页面为简易的分析页面,正式使用请用打包工具进行打包')
console.warn('页面上引用了很多cdn上的js,如果发现加载不了,请自行下载并替换到页面上')

// 扩展echart的init方法
window.echarts.myInit = function (ele, options) {
  if (typeof ele == 'string') {
    ele = document.querySelector(ele)
  }
  const singleChartWidth = $('#mainContainer').width()
  const singleChartHeight = 400
  return echarts.init(ele, 'macarons', Object.assign({
    width: singleChartWidth,
    height: singleChartHeight,
  }, options))
}

// document on ready
$(() => {

})