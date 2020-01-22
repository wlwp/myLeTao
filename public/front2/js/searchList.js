$(function() {
  // 1. 根据传过来的值获取产品列表
  var value = getSearch('key')
  console.log(value)
  // 设置给文本框
  $('.searchText').val(value)

  render()
  function render() {
   $('.lt_product').html('<div class="loading"></div>')
    var paramsObj = {}
    // 三个必传参数
    paramsObj.proName = $('.searchText')
      .val()
      .trim()
    paramsObj.page = 1
    paramsObj.pageSize = 100
    // 两个非必传参数
    var current = $('.main_nav ul li a.current')
    console.log(current.length)

    if (current.length === 1) {
      // 有current类
      var sortName = current.data('type')
      var sortValue = current.find('i').hasClass('fa fa-angle-down') ? 2 : 1
      paramsObj[sortName] = sortValue
    }
    console.log(paramsObj)

    setTimeout(function() {
      $.ajax({
        url: '/product/queryProduct',
        data: paramsObj,
        dataType: 'json',
        success: function(res) {
          console.log(res)
          var htmlstr = template('productTpl', res)
          $('.lt_product').html(htmlstr)
        }
      })
    }, 1000)
  }

  // 2. 排序选择
  $('.main_nav ul li a[data-type]').click(function() {
    // 有没有current类,没有就添加类,有就是要切换箭头方向
    if ($(this).hasClass('current')) {
      // 有,切换箭头方向
      $(this)
        .find('i')
        .toggleClass('fa fa-angle-up')
        .toggleClass('fa fa-angle-down')
    } else {
      // 没有
      $(this)
        .addClass('current')
        .parent()
        .siblings()
        .find('a')
        .removeClass('current')
    }
    render()
  })

  // 3. 搜索按钮点击搜索产品
  $('.searchBtn').click(function() {
    render()
    $('.searchText').val('')
  })
})
