// 禁用小圆环
NProgress.configure({ showSpinner: false })
// 用于判断有没有发送ajax请求,动态加载进度条
$(document).ajaxStart(function() {
  NProgress.start()
})
$(document).ajaxStop(function() {
  setTimeout(function() {
    NProgress.done()
  }, 1000)
})

// 登陆拦截

if (location.href.indexOf('login.html') === -1) {
  $.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    success: function(res) {
      console.log(res)
      if (res.error === 400) {
        // 未登录,拦截到登录页
        location.href = 'login.html'
      }
    }
  })
}

$(function() {
  // 点击分类管理,切换显示分类
  $('.aside_nav .category').click(function() {
    $('.indexCat')
      .stop()
      .slideToggle()
  })

  // 点击左上角按钮切换显示
  $('#icon_left').click(function() {
    $('.lt_aside').toggleClass('current')
    $('.topbar').toggleClass('current')
    $('.lt_main').toggleClass('current')
  })

  // 点击退出登录按钮,退出登录
  $('#icon_logout').click(function() {
    // 弹出模态框
    $('#modal').modal('show')

    $('.logoutBtn').click(function() {
      // 发送ajax
      $.ajax({
        type: 'get',
        url: '/employee/employeeLogout',
        dataType: 'json',
        success: function(res) {
          console.log(res)
          if (res.success) {
            location.href = 'login.html'
          }
        }
      })
    })
  })
})
