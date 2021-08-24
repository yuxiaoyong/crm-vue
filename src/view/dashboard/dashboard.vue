<template>
  <div>

<!--    <el-menu class="el-menu-demo el-action-bar" mode="horizontal" background-color="#F4F6F9" style="height:50px;padding: 7px;box-sizing: border-box;border:1px solid #E2E6EC;">-->

<!--    </el-menu>-->

    <template>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>客户订单排名</span>
            </div>
            <div class="text item">
              <div id="chart1" style="width: 100%;height:400px;"></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>客户状态</span>
            </div>
            <div class="text item">
              <div id="chart2" style="width: 100%;height:400px;"></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>客户分布情况</span>
            </div>
            <div class="text item">
              <div id="chart3" style="width: 100%;height:400px;"></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>客户趋势分析</span>
            </div>
            <div class="text item">
              <div id="chart4" style="width: 100%;height:400px;"></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </template>

  </div>
</template>

<script>
import * as $dashboard from '../../api/dashboard'
export default {
  name: 'dashboard',
  mounted () {
    this.createChart1()
    this.createChart2()
    this.createChart3()
    this.createChart4()
  },
  methods: {
    createChart1 () {
      var myChart = echarts.init(document.getElementById('chart1'))
      // 指定图表的配置项和数据
      var option = {
        tooltip: {},
        legend: {
          data: ['类型']
        },
        yAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        xAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },

    createChart2 () {
      $dashboard.getCustomerStatusStat().then(function (res) {
        var myChart = echarts.init(document.getElementById('chart2'))
        console.log(res.data)
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: '客户状态',
              type: 'pie',
              radius: '55%',
              data: res.data.entryList
            }
          ]
        })
      })
    },

    createChart3 () {
      var dom = document.getElementById("chart3")
      var myChart = echarts.init(dom)
      var app = {}
      var option = null
      option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['iphone']
        },
        visualMap: {
          min: 0,
          max: 2500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          calculable: true
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        series: [
          {
            name: '客户数量',
            type: 'map',
            mapType: 'china',
            roam: false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: [
              {name: '北京',value: Math.round(Math.random()*1000)},
              {name: '天津',value: Math.round(Math.random()*1000)},
              {name: '上海',value: Math.round(Math.random()*1000)},
              {name: '重庆',value: Math.round(Math.random()*1000)},
              {name: '河北',value: Math.round(Math.random()*1000)},
              {name: '河南',value: Math.round(Math.random()*1000)},
              {name: '云南',value: Math.round(Math.random()*1000)},
              {name: '辽宁',value: Math.round(Math.random()*1000)},
              {name: '黑龙江',value: Math.round(Math.random()*1000)},
              {name: '湖南',value: Math.round(Math.random()*1000)},
              {name: '安徽',value: Math.round(Math.random()*1000)},
              {name: '山东',value: Math.round(Math.random()*1000)},
              {name: '新疆',value: Math.round(Math.random()*1000)},
              {name: '江苏',value: Math.round(Math.random()*1000)},
              {name: '浙江',value: Math.round(Math.random()*1000)},
              {name: '江西',value: Math.round(Math.random()*1000)},
              {name: '湖北',value: Math.round(Math.random()*1000)},
              {name: '广西',value: Math.round(Math.random()*1000)},
              {name: '甘肃',value: Math.round(Math.random()*1000)},
              {name: '山西',value: Math.round(Math.random()*1000)},
              {name: '内蒙古',value: Math.round(Math.random()*1000)},
              {name: '陕西',value: Math.round(Math.random()*1000)},
              {name: '吉林',value: Math.round(Math.random()*1000)},
              {name: '福建',value: Math.round(Math.random()*1000)},
              {name: '贵州',value: Math.round(Math.random()*1000)},
              {name: '广东',value: Math.round(Math.random()*1000)},
              {name: '青海',value: Math.round(Math.random()*1000)},
              {name: '西藏',value: Math.round(Math.random()*1000)},
              {name: '四川',value: Math.round(Math.random()*1000)},
              {name: '宁夏',value: Math.round(Math.random()*1000)},
              {name: '海南',value: Math.round(Math.random()*1000)},
              {name: '台湾',value: Math.round(Math.random()*1000)},
              {name: '香港',value: Math.round(Math.random()*1000)},
              {name: '澳门',value: Math.round(Math.random()*1000)}
            ]
          }
        ]
      }
      if (option && typeof option === "object") {
        myChart.setOption(option, true)
      }
    },

    createChart4 () {
      $dashboard.getCustomerStatusStat().then(function (res) {
        var myChart = echarts.init(document.getElementById('chart4'))
        console.log(res.data)
        myChart.setOption({
          legend: {
            data: ['客户总量', '新增客户', '流失客户']
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}"
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '客户总量',
              type: 'line',
              data: [120, 132, 101, 134, 90, 230, 210, 211, 212, 213, 215, 240]
            },
            {
              name: '新增客户',
              type: 'line',
              data: [2, 4, 7, 6, 4, 7, 9, 1, 3, 5, 8, 4]
            },
            {
              name: '流失客户',
              type: 'line',
              data: [1, 2, 3, 1, 4, 3, 2, 2, 1, 3, 4, 0]
            }
          ]
        })
      })
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
