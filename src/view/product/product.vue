<template>
  <div>

    <el-row class="el-action-bar" style="flex">

      <el-col :span="16">
        <el-button-group>
          <el-button @click="handleEdit" size="small"><i class="el-icon-plus" style="font-weight: bold;font-size:14px;color:#409EFF;"></i> 添加</el-button>
          <el-button @click="handleDeleteSelected" size="small"><i class="el-icon-close" style="font-weight: bold;font-size:14px;color:#FF6873;"></i> 删除</el-button>
        </el-button-group>
      </el-col>

      <el-col :span="8">
        <el-input placeholder="请输入产品型号" v-model="query.name">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>

    </el-row>

    <template>
      <el-table border style="width: 100%; margin-top: 20px" v-loading="loading"
                :data="pagination.content" :row-class-name="tableRowClassName" @sort-change="handleSortChange" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="产品名称">
          <template slot-scope="scope">
            <el-button size="mini" type="text">{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="type" sortable="custom" label="产品型号">
          <template slot-scope="scope">{{ scope.row.type }}</template>
        </el-table-column>
        <el-table-column prop="packing" sortable="custom" label="产品规格">
          <template slot-scope="scope">{{ scope.row.packing }}</template>
        </el-table-column>
        <el-table-column prop="purchasePrice" sortable="custom" min-width="150" label="进货单价（元）">
          <template slot-scope="scope">{{ scope.row.purchasePrice}}</template>
        </el-table-column>
        <el-table-column prop="sellingPrice" sortable="custom" min-width="150" label="销售单价（元）">
          <template slot-scope="scope">{{ scope.row.sellingPrice}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑产品" placement="top">
              <el-button size="mini" type="warning" circle @click="handleEdit(scope.row)"><i class="el-icon-edit"></i></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除产品" placement="top">
              <el-button size="mini" type="danger" circle @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="管理库存" placement="top">
              <el-button size="mini" type="primary" circle @click="handleStock(scope.row)"><i class="el-icon-goods"></i></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-pagination :current-page="query.page+1" :page-sizes="[10, 20, 50]" :page-size="query.size" style="margin-top:10px;"
                   layout="total, sizes, prev, pager, next, jumper"
                   @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   prev-text="上一页" next-text="下一页" :background="true" :total="pagination.totalElements">
    </el-pagination>

    <product-form ref="productForm" @close="handleEditFormClose"></product-form>

  </div>
</template>

<script>
import * as $service from '../../api/product'
import productForm from './productForm'
import BaseListComp from '../../components/BaseListComp'

export default {
  name: 'product',
  extends: BaseListComp,
  components: {
    productForm
  },
  data () {
    return {
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
      this.$refs.productForm.open({ item: item })
    },

    handleStock (item) {
      this.$router.push({path: '/stock', params: {productId: item.id}})
    }

  }

}
</script>

<style>
  .el-table .success-row {
    background: #f0f9eb;
  }
  .form-title{
    display: block;
    height: 30px;
    background-color:#EEEEEE;
    line-height:30px;
    padding-left:10px;
  }
</style>
