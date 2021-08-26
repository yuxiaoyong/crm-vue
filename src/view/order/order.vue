<template>
  <div>
    <el-row class="el-action-bar" style="flex">

      <el-col :span="16">
        <el-button-group>
          <el-button @click="handleEdit" size="small"><i class="el-icon-plus" style="font-weight: bold;font-size:14px;color:#409EFF;"></i> 添加</el-button>
          <el-button @click="handleDeleteSelected" size="small"><i class="el-icon-close" style="font-weight: bold;font-size:14px;color:#FF6873;"></i> 删除</el-button>
        </el-button-group>
      </el-col>

<!--      <el-col :span="8">-->
<!--        <el-input placeholder="请输入产品型号" v-model="query.name">-->
<!--          <i slot="prefix" class="el-input__icon el-icon-search"></i>-->
<!--        </el-input>-->
<!--      </el-col>-->

    </el-row>

    <template>
      <template>
        <el-table border style="width: 100%; margin-top: 20px" v-loading="loading"
                  :data="pagination.content" :row-class-name="tableRowClassName" @sort-change="handleSortChange" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="serialNo" sortable="custom" label="订单编号">
            <template slot-scope="scope">{{ scope.row.serialNo }}</template>
          </el-table-column>
          <el-table-column prop="customer.name" label="客户名称">
            <template slot-scope="scope">
              <el-button size="mini" type="text">{{ scope.row.customer.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="orderTime" sortable="custom" label="订购时间">
            <template slot-scope="scope">{{ scope.row.orderTime }}</template>
          </el-table-column>
          <el-table-column prop="orderPrice" sortable="custom" min-width="80" label="订单价格（元）">
            <template slot-scope="scope">{{ scope.row.orderPrice}}</template>
          </el-table-column>
          <el-table-column prop="expressPrice" sortable="custom" min-width="80" label="快递价格（元）">
            <template slot-scope="scope">{{ scope.row.expressPrice}}</template>
          </el-table-column>
          <el-table-column prop="totalPrice" sortable="custom" min-width="80" label="总价格（元）">
            <template slot-scope="scope">{{ scope.row.orderPrice + scope.row.expressPrice}}</template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑订单" placement="top">
                <el-button size="mini" type="warning" circle @click="handleEdit(scope.row)"><i class="el-icon-edit"></i></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除订单" placement="top">
                <el-button size="mini" type="danger" circle @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </template>

    <el-pagination :current-page="query.page+1" :page-sizes="[10, 20, 50]" :page-size="query.size" style="margin-top:10px;"
                   layout="total, sizes, prev, pager, next, jumper"
                   @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   prev-text="上一页" next-text="下一页" :background="true" :total="pagination.totalElements">
    </el-pagination>

    <order-form ref="orderForm" @close="handleEditFormClose"></order-form>

  </div>
</template>

<script>
import * as $service from '../../api/order'
import orderForm from './orderForm'
import BaseListComp from '../../components/BaseListComp'

export default {
  name: 'order',
  extends: BaseListComp,
  components: {
    orderForm
  },
  data () {
    return {
      pagination: {
        customer: {name: ''}
      },
      query: {
        page: 0,
        size: 10,
        sort: 'order,asc'
      }
    }
  },
  methods: {

    getService () {
      return $service
    },

    handleEdit (item) {
      this.$refs.orderForm.open({ item: item })
    }

  }

}
</script>

<style>

</style>
