$(function() {
  // echarts绘图
  // 基于准备好的dom，初始化echarts实例
  var myChart1 = echarts.init(document.querySelector('.content_bottom .left'))
  var myChart2 = echarts.init(document.querySelector('.content_bottom .right'))

  // 指定图表的配置项和数据
  var option1 = {
    title: {
      text: '2020年注册人数',
      textStyle: {
        fontSize: 24
      },
      textAlign: 'auto'
    },
    tooltip: {},
    legend: {
      data: ['人数', '销量']
    },
    xAxis: {
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {},
    series: [
      {
        name: '人数',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      },
      {
        name: '销量',
        type: 'bar',
        data: [20, 10, 40, 50, 18, 30]
      }
    ]
  }

  var option2 = {
    title: {
      text: '某站点用户访问来源',
      subtext: '2020年2月',
      left: 'center',
      textStyle: {
        fontSize: 24
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克', '阿迪', '新百伦', '回力', '安踏']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '耐克' },
          { value: 310, name: '阿迪' },
          { value: 234, name: '新百伦' },
          { value: 135, name: '回力' },
          { value: 1548, name: '安踏' }
        ],

        itemStyle: {
          emphasis: {
            shadowBlur: 30,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0,0,0,.5)'
          }
        }
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart1.setOption(option1)
  myChart2.setOption(option2)
})
