$(function() {
  var currentPage = 1
  var pageSize = 5
  // 发送ajax获取数据
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
})
