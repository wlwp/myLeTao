

$(function() {
  // 注册表单校验初始化事件
  $('#form').bootstrapValidator({
    // 1. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 2. 指定需要校验的字段
    fields: {
      username: {
        validators: {
          // 非空校验
          notEmpty: {
            message: '用户名不能为空'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  })

  // 注册表单校验成功事件,阻止默认的表单提交,改为ajax提交
  $('#form').on('success.form.bv', function(e) {
    // 阻止默认的提交
    e.preventDefault()

    // 使用ajax提交
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(), // jQuery中表单序列化
      dataType: 'json',
      success: function(res) {
        console.log(res)
        if (res.error === 1000) {
          $('#form')
            .data('bootstrapValidator')
            .updateStatus('username', 'INVALID', 'callback')
        }
        if (res.error === 1001) {
          $('#form')
            .data('bootstrapValidator')
            .updateStatus('password', 'INVALID', 'callback')
        }
        if (res.success) {
          // 用户名,密码都正确
          location.href = 'index.html'
        }
      }
    })
  })
})
