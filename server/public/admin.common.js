console.warn('该页面为简易的分析页面,不会太正规地写,如果正式使用请用打包工具进行打包')
console.warn('页面上引用了很多cdn上的js,如果发现加载不了,请自行下载并替换到页面上')

// 配置
const postUrl = '/'

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

// 工具类
window.Util = {

}

// 管理后台方法集
window.Admin = {
  sideList: [
    {
      id: 'todayAll',
      name: '今日汇总',
    },
    {
      id: 'clickHeatMap',
      name: '点击热力图',
    }
  ],
  renderSideList(isFirstInsert = false) {
    let temp = ''
    for (let i of this.sideList) {
      temp += `
      <div class="item" data-id="${i.id}">
        <i class="icon">${String(i.name[0]).toLocaleUpperCase()}</i>
        <div class="name">${i.name}</div>
      </div>
      `
    }
    $('#sideItemWrapper').append(temp)
    if (isFirstInsert) {
      $('#sideItemWrapper .item:first').addClass('cur')
      this.getTemplate(this.sideList[0].id)
    }
  },
  addSideListEvent() {
    let that = this
    $('#sideItemWrapper .item').click(function () {
      $(this).addClass('cur').siblings('.item').removeClass('cur')
      that.getTemplate($(this).attr('data-id'))
    })
  },
  getTemplate(sideId) {
    axios({
      method: 'get',
      baseURL: postUrl,
      url: 'admin/template',
      params: {
        name: encodeURIComponent('template/' + sideId)
      },
      responseType: 'text'
    }).then(res => {
      console.log(res)
      if(res.data && typeof res.data != 'object') {
        $('#mainContainer').html(res.data)
      } else {
        throw(res.data)
      }
    }).catch(err => {
      console.error(err)
      alert(JSON.stringify(err))
    })
  }
}

// document on ready
$(() => {
  Admin.renderSideList(true)
  Admin.addSideListEvent()
})