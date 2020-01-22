$(function() {
  // 区域滚动效果
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false //是否显示滚动条
  })

  // 轮播图效果,获得slider插件对象
  var gallery = mui('.mui-slider')
  gallery.slider({
    interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
  })
})

// 需求: 地址栏  xxx.html?key=匡威&name=pp&age=18
//      解析地址栏参数, 将参数解析成一个对象
//      例如: { key: '匡威', name: 'pp', age: 18 }

function getSearch(key) {
  var str = location.search // "?key=%E5%8C%A1%E5%A8%81&name=pp&age=18"
  str = decodeURI(str) // "?key=匡威&name=pp&age=18"
  str = str.slice(1) // key=匡威&name=pp&age=18"
  var arr = str.split('&') // ["key=匡威", "name=pp", "age=18"]
  var obj = {}
  arr.forEach(function(v, i) {
    var key = v.split('=')[0]
    var value = v.split('=')[1]
    obj[key] = value
  })
  return obj[key]
}
