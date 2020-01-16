$(function() {
  // 1. 发送ajax获取商品列表数据
  var currentPage = 1
  var pageSize = 5

  var picArr = []
  render()
  function render() {
    $.ajax({
      url: '/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(res) {
        // console.log(res);

        var htmlstr = template('productTpl', res)
        $('tbody').html(htmlstr)

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

    $.ajax({
      url: '/category/querySecondCategoryPaging',
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

  // 3. 点击dropdown下拉菜单给dorpdown设置文本
  $('#dropdownMenu').on('click', 'a', function() {
    var id = $(this).data('id')
    // 给隐藏域设置value值
    $('[name="brandId"]').val(id)
    var txt = $(this).text()
    $('#secondCatName').text(txt)
    // 更新状态
    $('#form')
      .data('bootstrapValidator')
      .updateStatus('brandId', 'VALID')
  })

  // 4. 上传图片
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function(e, data) {
      console.log(data)
      var picObj = data.result
      var picAddr = picObj.picAddr

      picArr.unshift(picObj)
      console.log(picArr)

      var $img = $(
        '<img width="100" height="100" style="margin-left: 5px;" src="' +
          picAddr +
          '" alt="">'
      )
      $('#imgBox').prepend($img)

      if (picArr.length > 3) {
        picArr.pop()
        console.log(picArr)

        $('#imgBox img')
          .eq($('#imgBox img').length - 1)
          .remove()
      }

      if (picArr.length === 3) {
        $('#form')
          .data('bootstrapValidator')
          .updateStatus('brandStatus', 'VALID')
      }
    }
  })

  // 5. 初始化表单校验
  $('form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验的字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺码'
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是xx-xx,例如: 32-44'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品价格'
          }
        }
      },
      brandStatus: {
        validators: {
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      }
    }
  })

  // 6. 注册表单验证成功事件
  $('#form').on('success.form.bv', function(e) {
    e.preventDefault()

    var params = $('#form').serialize()
    params += '&picArr=' + JSON.stringify(picArr)
    console.log(params)

    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: params,
      dataType: 'json',
      success: function(res) {
        console.log(res)

        if(res.success) {
          $('#addCatModal').modal('hide')
          currentPage = 1
          render()

          $('#form').data('bootstrapValidator').resetForm(true)
          $('#secondCatName').text('请选择二级分类')
          $('#imgBox img').remove()
          picArr = []
        }
      }
    })
  })
})
