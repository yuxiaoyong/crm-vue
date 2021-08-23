<template>
  <div>

<!--    <el-menu class="el-menu-demo el-action-bar" mode="horizontal" background-color="#F4F6F9" style="height:50px;padding: 7px;box-sizing: border-box;border:1px solid #E2E6EC;">-->

<!--    </el-menu>-->

    <template>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>订单排名</span>
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
    </template>

  </div>
</template>

<script>
import * as $dashboard from "../../api/dashboard"
export default {
  name: 'dashboard',
  mounted () {
    this.createChart1()
    this.createChart2()
  },
  methods: {
    createChart1 () {
      var myChart = echarts.init(document.getElementById('chart1'))
      // 指定图表的配置项和数据
      var option = {
        tooltip: {},
        legend: {
          data:['类型']
        },
        yAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
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
