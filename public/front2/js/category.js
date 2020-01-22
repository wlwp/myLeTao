$(function() {
  // 1. 动态获取左侧列表
  $.ajax({
    url: '/category/queryTopCategory',
    success: function(res) {
      console.log(res)
      var htmlstr = template('firstTpl', res)
      $('.topCate').html(htmlstr)
      // 默认一进入页面就渲染第一个列表数据
      render(res.rows[0].id)
    }
  })
  // 2. 点击左侧菜单,获取右侧二级分类数据
  $('.main_left').on('click', 'ul li a', function() {
    var id = $(this).data('id')
    // console.log(id);
    render(id)
    $('.main_left ul li a').removeClass('current')
    $(this).addClass('current')
    // $(this).addClass('current').parent().siblings().find('a').removeClass('current')
  })
  // 3. 获取右侧列表,封装
  function render(id) {
    $.ajax({
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      dataType: 'json',
      success: function(res) {
        console.log(res)
        var htmlstr = template('secondTpl', res)
        $('.secondCate').html(htmlstr)
      }
    })
  }
})
