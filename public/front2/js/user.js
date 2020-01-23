$(function() {

  // 1. 一进入页面,渲染数据
  $.ajax({
    url: '/user/queryUserMessage',
    dataType: 'json',
    success: function( res ) {
      console.log( res );
      if(res.error === 400) {
        // 说明未登录
        location.href = 'login.html'
        return
      }
      var htmlstr = template('userTpl', res)
      $('#userInfo').html(htmlstr)
    }
  })

  // 2. 退出功能
  $('#logout').click(function() {

    $.ajax({
      url: '/user/logout',
      success: function( res ) {
        console.log(res);
        if(res.success) {
          location.href = 'login.html'
        }
        
      }
    })


  })
})