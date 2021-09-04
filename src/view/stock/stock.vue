<template>
  <div>
    <el-row class="el-action-bar" style="flex">

      <el-col :span="10">
        <el-button-group>
          <el-button @click="handleEdit" size="small"><i class="el-icon-plus" style="font-weight: bold;font-size:14px;color:#409EFF;"></i> 添加</el-button>
          <el-button @click="handleDeleteSelected" size="small"><i class="el-icon-close" style="font-weight: bold;font-size:14px;color:#FF6873;"></i> 删除</el-button>
        </el-button-group>
      </el-col>

      <el-col :span="4" style="text-align: right;">
        <el-input placeholder="请输单位名称" v-model="query.keyword">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="4" style="text-align: right;">
        <el-select v-model="query.productId" placeholder="请选择产品" clearable >
          <el-option v-for="item in productList"
                     :key="item.type"
                     :label="item.type"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" style="text-align: right;">
        <el-date-picker
          v-model="timeRange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-col>

    </el-row>

    <template>
      <template>
        <el-table border style="width: 100%; margin-top: 20px" v-loading="loading"
                  :data="pagination.content" :row-class-name="tableRowClassName" @sort-change="handleSortChange" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="product.name" label="产品名称">
            <template slot-scope="scope">
              <el-button size="mini" type="text">{{ scope.row.product.name + ' - ' + scope.row.product.type}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="serialNo" sortable="custom" label="流水号">
            <template slot-scope="scope">
              <span v-if="scope.row.changeType === 'ORDER'"><el-button type="success">订单</el-button> {{ scope.row.changeSerialNo }}</span>
              <span v-if="scope.row.changeType === 'PURCHASE'"><el-button type="danger" >进货</el-button> {{ scope.row.changeSerialNo }}</span>
              <span v-if="scope.row.changeType === 'MANUAL'"><el-button type="warning" >人为</el-button></span>
            </template>
          </el-table-column>
          <el-table-column prop="changeTime" sortable="custom" label="变更时间">
            <template slot-scope="scope">{{ formatTime(scope.row.changeTime, 'YYYY-MM-DD HH:mm') }}</template>
          </el-table-column>
          <el-table-column prop="changeQuantity" sortable="custom" min-width="80" label="变更数量">
            <template slot-scope="scope">
              <el-button size="mini" type="success" v-if="scope.row.changeQuantity < 0" >{{ scope.row.changeQuantity}}</el-button>
              <el-button size="mini" type="danger" v-else >{{ '+' + scope.row.changeQuantity}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="changeQuantity" sortable="custom" min-width="80" label="变更原因">
            <template slot-scope="scope">
              <span v-if="scope.row.changeType === 'ORDER'">{{scope.row.changeRemark}}【下单购买】</span>
              <span v-if="scope.row.changeType === 'PURCHASE'">{{scope.row.changeRemark}} 【产品采购】</span>
              <span v-if="scope.row.changeType === 'MANUAL'">{{scope.row.changeRemark}}</span>
            </template>
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

    <order-form ref="stockForm" @close="handleEditFormClose"></order-form>

  </div>
</template>

<script>
import * as $service from '../../api/stock'
import * as $product from '../../api/product'
import $lodash from "lodash"
import orderForm from './stockForm'
import BaseListComp from '../../components/BaseListComp'
import {formatTime} from "../../util/global";

export default {
  name: 'stock',
  extends: BaseListComp,
  components: {
    orderForm
  },
  mounted () {
    this.getProductList()
  },
  watch: {
    'query.productId': function (a1, a2) {
      this.getListData()
    },
    'query.keyword': function () {
      this.getListData()
    },
    timeRange: function (newval, oldval) {
      this.query.startTime = formatTime(newval[0], 'YYYY-MM-DD')
      this.query.endTime = formatTime(newval[1], 'YYYY-MM-DD')
      this.getListData()
    }
  },
  data () {
    return {
      productList: [],
      pagination: {
        customer: {name: ''}
      },
      timeRange: null,
      query: {
        startTime: null,
        endTime: null,
        keyword: null,
        productId: null,
        page: 0,
        size: 10,
        sort: 'createTime,desc'
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {

    getService () {
      return $service
    },

    handleEdit (item) {
      this.$refs.stockForm.open({ item: item })
    },

    getProductList () {
      $product.findList({page: 0, size: 100}).then((res) => {
        this.productList = res.data.content
      })
    },

    getListData: $lodash.debounce(function () {
      this.loading = true
      this.getService().queryList(this.query).then((res) => {
        this.pagination = res.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }, 200)

  }

}
</script>

<style>

</style>
