$(function() {
  // 1. 一进入页面,发送ajax 获取页面数据
  render()
  function render() {
    $.ajax({
      url: '/cart/queryCart',
      success: function(res) {
        console.log(res)

        if (res.error === 400) {
          // 未登录
          location.href = 'login.html?retUrl=' + location.href
          return
        } else {
          var htmlstr = template('cartTpl', { list: res })
          $('#cartInfo').html(htmlstr)
        }
      }
    })
  }

  // 2. 删除功能
  $('#cartInfo').on('click', '.btn_delete', function() {
    var id = $(this).data('id')
    console.log(id)
    $.ajax({
      url: '/cart/deleteCart',
      data: {
        id: [id]
      },
      dataType: 'json',
      success: function(res) {
        console.log(res)
        if (res.success) {
          // 删除成功
          render()
        }
      }
    })
  })
})
