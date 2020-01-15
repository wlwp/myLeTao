$(function() {
  var currentPage = 1
  var pageSize = 5
  render()
  function render() {
    // 发送ajax获取一级分类数据,并渲染
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(res) {
        // console.log(res);
        var htmlstr = template('firstTpl', res)
        $('tbody').html(htmlstr)

        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: res.page,
          totalPages: Math.ceil(res.total / res.size),
          onPageClicked: function(a, b, c, page) {
            console.log(page)
            currentPage = page

            render()
          }
        })
      }
    })
  }

  // 2. 点击添加分类
  $('#addCat').click(function() {
    $('#addCatModal').modal('show')
  })

   // 3. 通过校验插件, 添加校验功能
   $("#form").bootstrapValidator({

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 校验的字段
    fields: {
      categoryName: {
        // 校验规则
        validators: {
          // 非空检验
          notEmpty: {
            // 提示信息
            message: "请输入一级分类名称"
          }
        }
      }
    }
  });

  // 注册表单验证成功事件
  $('#form').on('success.form.bv', function(e) {
    e.preventDefault()

    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function ( res ) {
        console.log( res );
        if(res.success) {
          $('#addCatModal').modal('hide')
          currentPage = 1
          render() 

          // 重置表单
          $('#form').data('bootstrapValidator').resetForm(true)
        }
        
      }
    })
  })

})
