$(function() {

  // 一进入页面,发送ajax请求
  render()
 function render() {
  $.ajax({
    url: '/cart/queryCart',
    success: function( res) {
      console.log(res);
      if(res.error === 400) {
        // 未登录
        location.href = 'login.html?retUrl='+ location.href
        return
      }
      var htmlstr = template('cartTpl', {list: res})
      $('#cartlist').html(htmlstr)
      
    }
  })
 }

  // 删除
  $('#cartlist').on('click', '.btn_delete', function() {
   var id = $(this).data('id')
    $.ajax({
      url: '/cart/deleteCart',
      data: {
        id: [id]
      },
      dataType: 'json',
      success: function( res ) {
        console.log(res);
        if( res.success ) {
          render()

        }
        
      }
    })

  })
})