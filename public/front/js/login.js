$(function() {
  $('#loginBtn').click(function() {
    var username = $('#username')
      .val()
      .trim()

    var password = $('#password')
      .val()
      .trim()
    if (username === '') {
      mui.toast('请输入用户名')
      return
    }
    if (password === '') {
      mui.toast('请输入密码')
      return
    }
    // 发送ajax,登录
    $.ajax({
      type: 'post',
      url: '/user/login',
      data: {
        username: username,
        password: password
      },
      dataType: 'json',
      success: function(res) {
        console.log(res)
        if (res.error === 403) {
          mui.toast('用户名或者密码错误')
          return
        }
        if (res.success) {
          // 成功
          // 1. 如果有传参,要跳回去
          // 2. 如果没有传参,就跳到user.html

          if (location.search.indexOf('retUrl') != -1) {
            //  location.search => ?retUrl=http://localhost:3000/front/product.html?productId=27
            // 有传参
            var retUrl = location.search.replace('?retUrl=', '')
            location.href = retUrl
            
          } else {
            // 没有传参
            location.href = 'user.html'
          }
        }
      }
    })
  })
})
