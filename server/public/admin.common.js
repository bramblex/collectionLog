console.warn('该页面为简易的分析页面,正式使用请用打包工具进行打包')
console.warn('页面上引用了很多cdn上的js,如果发现加载不了,请自行下载并替换到页面上')

const http = axios.post
const sideList = [
  { id: 'todayPv', name: '当天pv' },
  { id: 'heatmap', name: '页面热力图' },
]


function renderSideList() {
  let sideListTemplate = ''
  for (let i of sideList) {
    sideListTemplate += `
    <a class="item" href="#${i.id}" sideId="${i.id}">
      <i class="icon">${i.name[0]}</i>
      <div class="name">${i.name}</div>
    </a>
    `
  }
  $('#sideItemWrapper').append(sideListTemplate)
}

function handelClickSideItem() {
  $('#sideItemWrapper a.item').click(function () {
    $(this).addClass('cur').siblings('.item').removeClass('cur')
    renderChart($(this).attr('sideId'))
  })
}

function renderChart(sideId) {
  console.log(sideId)
}

function initPage() {

}

// document on ready
$(() => {
  renderSideList()  // 渲染侧边栏
  handelClickSideItem() // 侧边栏点击

  initPage()  // 初始化页面
})