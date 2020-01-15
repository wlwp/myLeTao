$(function() {

  var currentPage = 1 // 设置当前页
  var pageSize = 5 // 设置每页条数
  render()
  // 1. 发送ajax请求用户数据
  function render() {
    $.ajax({
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(res) {
        console.log(res)

        var htmlstr = template('userTpl', res)
        $('tbody').html(htmlstr)

        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: res.page,
          totalPages: Math.ceil(res.total / res.size),
          onPageClicked: function(a, b, c, page) {
            // console.log(page)
            currentPage = page
            render()

          }
        })
      }
    })
  }

  // 2. 设置用户状态
  $('tbody').on('click', 'button', function() {
    // 弹出模态框
    $('#userModal').modal('show')
  
    var id = $(this).parent().data('id')

    var isDelete = $(this).hasClass('btn-danger') ? 0 : 1    
    
    // 3. 确认修改用户状态
    $('.confirmBtn').click(function() {
  
      // 发送ajax
      $.ajax({
        type: 'post',
        url: '/user/updateUser',
        data: {
          id: id,
          isDelete: isDelete
        },
        success: function( res ) {
          console.log( res );

          if(res.success) {
            // 关闭模态框
            $('#userModal').modal('hide')
            // 刷新页面
            render()
          }
          
        }
      })
    })
  })

})
