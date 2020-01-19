$(function() {
  // 获取产品id
  var productId = getSearch('productId')
  console.log(productId)

  $.ajax({
    url: '/product/queryProductDetail',
    data: {
      id: productId
    },
    dataType: 'json',
    success: function(res) {
      console.log(res)
      var htmlstr = template('productTpl', res)
      $('.mui-scroll').html(htmlstr)

      //获得slider插件对象
      var gallery = mui('.mui-slider')
      gallery.slider({
        interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
      })

      // 初始化数字框
      mui('.mui-numbox').numbox()
    }
  })
})
