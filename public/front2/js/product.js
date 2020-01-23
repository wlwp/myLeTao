$(function() {
  // 1. 动态获取轮播图
  var productId = getSearch('productId')
  $.ajax({
    url: '/product/queryProductDetail',
    data: {
      id: productId
    },
    dataType: 'json',
    success: function(res) {
      console.log(res)
      var htmlstr = template('productTpl', res)
      $('.product_detail').html(htmlstr)
      // 获得slider插件对象(动态获取的轮播图需要手动初始化)
      var gallery = mui('.mui-slider')
      gallery.slider({
        interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
      })

      // 数字输入框初始化
      mui('.mui-numbox').numbox()
    }
  })

  // 2. 给尺码添加点击事件
  $('.product_detail').on('click', '.item_box span', function() {
    $(this)
      .addClass('current')
      .siblings()
      .removeClass('current')
  })

  // 3. 加入购物车
  $('#addCart').click(function() {
    var size = $('.lt_size span.current').text()
    console.log(size)
    var num = $('.lt_num input')
      .val()
      .trim()

    $.ajax({
      type: 'post',
      url: '/cart/addCart',
      data: {
        productId: productId,
        size: size,
        num: num
      },
      dataType: 'json',
      success: function(res) {
        console.log(res)
        if(res.error === 400) {
          // 未登录
          location.href = 'login.html?retUrl=' + location.href
          return

        }
        if(res.success) {
          // 加入成功
          mui.confirm('添加成功', '温馨提示', ['继续浏览', '去购物车'], function(e) {
            console.log(e.index);
            if(e.index === 1) {
              location.href = 'cart.html'
            }
            
          })
        }
      }
    })
  })
})
