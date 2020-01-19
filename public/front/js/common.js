$(function() {
  // 1. 区域滚动
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false //是否显示滚动条
  })

  // 2. 轮播图,获得slider插件对象
  var gallery = mui('.mui-slider')
  gallery.slider({
    interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
  })
})

// 3. 这是一个方法专门用于获取地址栏关键字
function getSearch(k) {
  // 获取地址栏参数
  var str = location.search // ?key=%E5%8C%A1%E5%A8%81&name=pp&age=18
  // 进行转码
  str = decodeURI(str) // ?key=匡威&name=pp&age=18
  // 截取需要的
  str = str.slice(1) //  key=匡威&name=pp&age=18
  // 字符串分割
  var arr = str.split('&') // ["key=匡威", "name=pp", "age=18"]
  // 遍历数组
  var obj = {}
  arr.forEach(function(v, i) {
    var key = v.split('=')[0]
    var value = v.split('=')[1]
    // 将属性添加到对象中
    obj[key] = value
  })

  return obj[k]
}
