$(function() {
  // 1. 发送ajax获取一级分类名称,并动态渲染到左侧区域
  $.ajax({
    url: '/category/queryTopCategory',
    success: function(res) {
      console.log(res)
      var htmlstr = template('firstTpl', res)
      $('#leftMenu').html(htmlstr)

      getSecond(res.rows[0].id)
    }
  })

  // 2.点击左侧获取右侧详细内容
  $('#leftMenu').on('click', 'a', function() {
    // $(this).addClass('active').parent().siblings().find('a').removeClass('active')
    $('#leftMenu a').removeClass('active')
    $(this).addClass('active')
    var id = $(this).data('id')
    console.log(id)

    getSecond(id)
  })

  // 3. 动态获取右侧数据
  
  function getSecond(id) {
    $.ajax({
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      success: function(res) {
        console.log(res)
        var htmlstr = template('secondTpl',res)
        $('#secondMenu').html(htmlstr)
      }
    })
  }
})
