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

  // 给鞋码添加点击事件

  $('.lt_main').on('click', '.lt_size span', function() {
    $(this).addClass('current').siblings().removeClass('current')
  })

  // 加入购物车功能
  $('#addCart').click(function() {

    var size = $('.lt_size span.current').text()
    
    if(!size) {
      mui.toast('请选择尺码')
      return
    }
    var num = $('.mui-numbox-input').val()
    var num = 
    $.ajax({
      type: 'post',
      url: '/cart/addCart',
      data: {
        num: num,
        size: size,
        productId: productId

      },
      dataType: 'json',
      success: function(res ) {
        console.log( res );
        if(res.error === 400) {
          location.href = 'login.html?retUrl=' + location.href
          return 
        }

        if(res.success) {
          // 加入成功
          mui.confirm('加入成功', '温馨提示', ['去购物车', '继续浏览'], function(e) {
            console.log(e.index);
            if(e.index === 0) {
              location.href = 'cart.html'
            }
            
          })
        }

        
      }
     })
  })
})
