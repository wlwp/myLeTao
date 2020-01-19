$(function() {
  // 获取地址栏的关键字
  var key = getSearch('key')

  // 设置给input框
  $('.searchText').val(key)

  // 一进入页面,发送ajax获取搜索产品
  render()

  // 点击搜索按钮,搜索产品,发送ajax获取内容并渲染
  $('.searchBtn').click(function() {
    render()
    $('.searchText').val('')
  })

  // 点击切换排序
  $('.lt_sort a[data-type]').click(function() {
    if ($(this).hasClass('current')) {
      // 1. 如果有current类就切换箭头方向,up down,改变箭头的方向
      $(this)
        .find('i')
        .toggleClass('fa fa-angle-up')
        .toggleClass('fa fa-angle-down')
      // 2. 切换类名进行排序
    } else {
      // 2. 如果没有类名就添加current类,排他
      $(this)
        .addClass('current')
        .siblings()
        .removeClass('current')
    }
    render()
  })

  function render() {
    // 渲染前,先加载loading的盒子
   $('.main_product').html('<div class="loading"></div>')
    var paramsObj = {}
    paramsObj.proName = $('.searchText')
      .val()
      .trim()
    paramsObj.page = 1
    paramsObj.pageSize = 100

    // 根据有没有高亮的a来判断是否要进行排序,也就是需要根据current类来判断
    $current = $('.lt_sort a.current')
    if ($current.length === 1) {
      // 说明有高亮的a
      // 再来判断到底是降序还是升序
      var sortName = $current.data('type')
      var sortValue = $current.find('i').hasClass('fa fa-angle-down') ? 2 : 1
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
          $('.main_product').html(htmlstr)
        }
      })
    }, 1000)
  }
})
