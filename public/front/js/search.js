$(function() {
  /*假数据
  var arr = ['耐克', '阿迪', '李宁', '新百伦', '安踏', '匡威']
  var jsonStr = JSON.stringify(arr)
  localStorage.setItem('search_list', jsonStr)
  */
  // 1. 从本地获取数据,渲染搜索历史
  function getHistory() {
    var history = localStorage.getItem('search_list') || '[]'
    var arr = JSON.parse(history)
    return arr
  }
  render()
  function render() {
    var arr = getHistory()
    var htmlstr = template('searchTpl', { arr: arr })
    $('.lt_history').html(htmlstr)
  }

  // 2. 点击清空所有的历史记录
  $('.btn_empty').click(function() {
    //修改弹出框默认input类型为password
    mui.confirm(
      '您确定要清空历史记录吗?',
      '温馨提示',
      ['取消', '确认'],
      function(e) {
        console.log(e)
        if (e.index === 1) {
          localStorage.removeItem('search_list')
          render()
        }
      }
    )
  })

  // 3. 点击清除某一个(事件委托)
  $('.lt_history').on('click', 'ul li i', function() {
    var that = this
    mui.confirm(
      '您确定要清除该条记录吗?',
      '温馨提示',
      ['取消', '确认'],
      function(e) {
        // 1. 找到那一条要删的记录(通过下标)
        // 2. 从本地拿出数组,找到对应的下标,从数组中删除此项
        // 3. 再存储到本地
        // 4. 再渲染页面
        if (e.index === 1) {
          var index = $(that)
            .parent()
            .data('index')
          var arr = getHistory()
          arr.splice(index, 1)
          localStorage.setItem('search_list', JSON.stringify(arr))
          render()
        }
      }
    )
  })

  // 4. 搜索功能
  // 1. 获取输入框的值
  // 2. 点击搜索按钮,从本地数组里获取有没有这个值,有就把之前的删除,
  //    把最新的值放在最上面,没有就直接添加到数组里
  // 3. 再把数组存到本地
  // 4. 重新渲染页面
  $('.searchBtn').click(function() {
    // 获取输入框的文本
    var txt = $('.searchText')
      .val()
      .trim()
    if (txt === '') {
      mui.toast('请输入搜索关键字',{ duration:'short', type:'div' }) 
      $('.searchText').val('')
      return
    }
    var arr = getHistory()
   
    var index = arr.indexOf(txt)
    if (index != -1) {
      // 说明数组中有此项,把原来的删除,把最新的添加到最前面
      arr.splice(index, 1)
    } 
    if (arr.length >= 6) {
      arr.pop()
    }
    // 说明数组里没有此项,直接添加到最前面
    arr.unshift(txt)
    

    localStorage.setItem('search_list', JSON.stringify(arr))
    render()
    $('.searchText').val('')

    // 添加完搜索历史后,要跳转到搜索列表页
    location.href = 'searchList.html?key=' + txt;

   
  })
})
