
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

