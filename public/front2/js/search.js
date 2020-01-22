$(function() {
  /* 假数据
  var arr = ['匡威', '阿迪', '耐克', '彪马', '回力']
  var jsonStr = JSON.stringify(arr)
  localStorage.setItem('search_list', jsonStr)
  */
  // 1. 从本地获取历史记录数据(localStorage),并渲染到页面上
  function getLocalStorage() {
    var jsonStr = localStorage.getItem('search_list') || '[]'
    var arr = JSON.parse(jsonStr)
    return arr
  }
  render()
  function render() {
    var arr = getLocalStorage()
    var htmlstr = template('historyTpl', { list: arr })
    $('.main_content').html(htmlstr)
  }

  // 2. 点击按钮,清空全部历史记录
  $('.clearEmpty').click(function() {
    mui.confirm(
      '您确定要清空历史记录吗?',
      '温馨提示',
      ['取消', '确认'],
      function(e) {
        // console.log(e);
        if (e.index === 1) {
          // 点击了确认
          localStorage.removeItem('search_list')
          render()
        }
      }
    )
  })

  // 3. 点击删除单个
  $('.main_content').on('click', '.emptyBtn', function() {
    // 用that代替this
    var that = this
    mui.confirm(
      '您确定要删除该条记录吗?',
      '温馨提示',
      ['取消', '确认'],
      function(e) {
        if (e.index === 1) {
          console.log(this) // this指向window

          // 点击了确认
          var arr = getLocalStorage()
          var index = $(that)
            .parent()
            .data('index')
          arr.splice(index, 1)
          // console.log(arr);
          localStorage.setItem('search_list', JSON.stringify(arr))
          render()
        }
      }
    )
  })

  // 4. 输入框搜索功能
  // 原来记录有,就把原来的删除,把搜索的添加到最前面
  // 原来没有的就添加到最前面
  // 数组长度限制在6个

  $('.searchBtn').click(function() {
    // 1. 获取文本框的值
    var value = $('.searchText')
      .val()
      .trim()
    if (value === '') {
      mui.toast('请输入搜索关键字', { duration: 'short' })
      $('.searchText').val('')
      return
    }
    var arr = getLocalStorage()

    var index = arr.indexOf(value)
    if (index === -1) {
      // 原来记录没有,直接添加到最前面
    } else {
      // 原来的记录有该项,删除原来的,保留最新的,添加到最前面
      arr.splice(index, 1)
    }
    arr.unshift(value)
    console.log(arr.length)
    // 如果数组长度大于6就删除最后一项
    if (arr.length > 6) {
      arr.pop()
    }
    localStorage.setItem('search_list', JSON.stringify(arr))
    render()
    $('.searchText').val('')
    // 跳转到searchList页面
    location.href = 'searchList.html?key=' + value
  })
})
