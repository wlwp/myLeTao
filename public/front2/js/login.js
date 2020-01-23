$(function() {
  // 1. 登录验证
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
    // 发送ajax
    $.ajax({
      url: '/user/login',
      type: 'post',
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
          // 1. 地址栏如果有传参跳回来
          // 2. 地址栏没有传参跳到用户中心
          if (location.href.indexOf('retUrl') === -1) {
            // 没有传参
            location.href = 'user.html'
          } else {
            // 有传参
            var locationUrl = location.search.replace('?retUrl=', '')
            // console.log(locationUrl);
            location.href = locationUrl
          }
        }
      }
    })
  })
})
