<template>
  <div>
    <ul class="navi-tab">
      <li>全部</li>
      <li class="active">本周</li>
      <li>本月</li>
      <li>本年</li>
    </ul>
    <el-menu class="el-menu-demo el-action-bar" mode="horizontal" background-color="#F4F6F9" style="height:50px;padding: 7px;box-sizing: border-box;border:1px solid #E2E6EC;">

      <el-button size="small"><i class="el-icon-search" style="font-weight: bold;font-size:14px;color:#409EFF;"></i> 搜索</el-button>
      <el-button-group>
        <el-button size="small"><i class="el-icon-plus" style="font-weight: bold;font-size:14px;color:#409EFF;"></i> 新建</el-button>
        <el-button size="small"><i class="el-icon-edit" style="font-weight: bold;font-size:14px;color:#FC9409;"></i> 修改</el-button>
        <el-button size="small"><i class="el-icon-close" style="font-weight: bold;font-size:14px;color:#FF6873;"></i> 删除</el-button>
      </el-button-group>
      <el-button-group>
        <el-button size="small"><i class="el-icon-upload2" style="font-weight: bold;font-size:14px;color:#3FBC9C;"></i> 导出</el-button>
        <el-button size="small"><i class="el-icon-download" style="font-weight: bold;font-size:14px;color:#FF6873;"></i> 导入</el-button>
      </el-button-group>

      <div style="float:right;">
        <el-button-group>
          <el-button size="small"><i class="el-icon-search" style="font-weight: bold;font-size:14px;color:#409EFF;"></i> 统计</el-button>
        </el-button-group>
        <el-button-group>
          <el-button size="small"><i class="el-icon-plus" style="font-weight: bold;font-size:14px;color:#409EFF;"></i> 显示列</el-button>
        </el-button-group>
        <el-button-group>
          <el-button size="small"><i class="el-icon-edit" style="font-weight: bold;font-size:14px;color:#FC9409;"></i> 排序</el-button>
        </el-button-group>
      </div>

    </el-menu>

    <template>
      <el-table :data="tableData6" border height="350" show-summary style="width: 100%; margin-top: 20px">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="amount1" label="数值 1（元）"></el-table-column>
        <el-table-column prop="amount2" label="数值 2（元）"></el-table-column>
        <el-table-column prop="amount3" label="数值 3（元）"></el-table-column>
      </el-table>
    </template>

    <el-pagination :current-page="1" :page-sizes="[10, 20, 50, 100]" :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      prev-text="上一页" next-text="下一页" :background="true" :total="1000">
    </el-pagination>

  </div>
</template>

<script>
export default {
  name: "followup",
  data(){
      return {
        tableData6: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }, {
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }]
      }
  }

}
</script>

<style>

</style>
