$(function() {
  var currentPage = 1
  var pageSize = 5
  // 1. 发送ajax获取数据
  render()
  function render() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(res) {
        var htmlstr = template('secondTpl', res)
        $('tbody').html(htmlstr)

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: res.page,
          totalPages: Math.ceil(res.total / res.size),
          onPageClicked: function(a, b, c, page) {
            currentPage = page
            render()
          }
        })
      }
    })
  }

  // 2. 点击添加分类
  $('#addCat').click(function() {
    // 显示模态框
    $('#addCatModal').modal('show')
    // 3. 发送ajax获取一级分类数据,渲染到dropdown里
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 1000
      },
      dataType: 'json',
      success: function(res) {
        console.log(res)

        var htmlstr = template('dropdownTpl', res)
        $('#dropdownMenu').html(htmlstr)
      }
    })
  })

  // 3. 动态设置给dropdown文本
  $('#dropdownMenu').on('click', 'a', function() {

    var id = $(this).data('id')
    // console.log(id);

    $('[name="categoryId"]').val(id)
    var txt = $(this).text()
    $('.dropdown #firstCatName').text(txt)

    // 手动把状态改为成功状态
    $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
  })

  // 4. 图片上传
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function(e, data) {
      console.log(data)
      // 获取路径
      var src = data.result.picAddr
      // 给图片设置路径
      $('#imgbox').attr('src', src)
      // 把路径设置给隐藏域的value值
      $('[name="brandLogo"]').val(src)

      // 手动把状态改为成功状态
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
    }
  })

  // 5. 初始化表单校验
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 3. 校验的字段列表
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类名称'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传图片'
          }
        }
      },
    }
  })

  // 6. 注册表单验证成功事件
  $('#form').on('success.form.bv', function(e) {

    e.preventDefault()

    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function(res) {

        if(res.success) {
          $('#addCatModal').modal('hide')

          currentPage = 1
          render()

          $('#form').data('bootstrapValidator').resetForm(true)

          $('#firstCatName').text('请选择一级分类')
          $('#imgbox').attr('src', './images/none.png')

        }
        
      }
    })
  })
})
