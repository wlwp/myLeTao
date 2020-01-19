$(function() {

  // 发送ajax
  $.ajax({
    url: '/user/queryUserMessage',
    dataType: 'json',
    success: function( res ){
      console.log( res );
      if( res.error === 400) {
        // 未登录
        location.href = 'login.html'
      }
      var htmlstr = template('userTpl', res)
      $('#userInfo').html(htmlstr)
      
    }
  })

  // 退出功能
  $('#logout').click(function() {
    $.ajax({
      url:'/user/logout',
      success: function( res) {
        console.log( res );
        if(res.success) {
          // 退出成功
          location.href = 'login.html'
        }
        
      }
    })
  })
})