<template>
  <div>

    <el-row class="el-action-bar" type="flex">

      <el-col :span="16">
        <el-button-group>
          <el-button @click="handleEdit(null); $event.stopPropagation();" size="small"><i class="el-icon-plus" style="font-weight: bold;font-size:14px;color:#409EFF;"></i> 添加</el-button>
          <el-button @click="handleDeleteSelected" size="small"><i class="el-icon-close" style="font-weight: bold;font-size:14px;color:#FF6873;"></i> 删除</el-button>
        </el-button-group>
      </el-col>

      <el-col :span="8" style="text-align: right;">
        <el-input placeholder="请输入订单编号" v-model="query.serialNum">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>

    </el-row>

    <el-table border style="width: 100%; margin-top: 20px" v-loading="loading"
              :data="pagination.content" :row-class-name="tableRowClassName"
              @sort-change="handleSortChange" @selection-change="handleSelectionChange" @row-click="showDetailPanel">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="serialNo" sortable="custom" fixed min-width="150" label="流水号">
        <template slot-scope="scope">
          <el-button size="mini" type="text">{{ scope.row.serialNo }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="serialNum" sortable="custom" fixed min-width="150" label="订单编号">
        <template slot-scope="scope">
          <el-button size="mini" type="text">{{ scope.row.serialNum }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="supplier.name" sortable="custom" min-width="200" label="供货单位">
        <template slot-scope="scope">{{ scope.row.supplier.name}}</template>
      </el-table-column>
      <el-table-column prop="orderDate" sortable="custom" min-width="100" label="下单时间">
        <template slot-scope="scope">{{ formatTime(scope.row.orderDate, 'YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column prop="deliveryDate" sortable="custom" min-width="100" label="到货时间">
        <template slot-scope="scope">{{ formatTime(scope.row.deliveryDate, 'YYYY-MM-DD')}}</template>
      </el-table-column>
      <el-table-column prop="quantity" sortable="custom" min-width="100" label="成交数量">
        <template slot-scope="scope">{{ scope.row.quantity}}</template>
      </el-table-column>
      <el-table-column prop="amount" sortable="custom" min-width="150" label="成交金额">
        <template slot-scope="scope">{{ scope.row.amount}}</template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑订单" placement="top">
            <el-button size="mini" type="warning" circle @click="handleEdit(scope.row);$event.stopPropagation();"><i class="el-icon-edit"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除订单" placement="top">
            <el-button size="mini" type="danger" circle @click="handleDelete(scope.row);$event.stopPropagation();"><i class="el-icon-delete"></i></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination :current-page="query.page+1" :page-sizes="[10, 20, 50]" :page-size="query.size" style="margin-top:10px;"
                   layout="total, sizes, prev, pager, next, jumper"
                   @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   prev-text="上一页" next-text="下一页" :background="true" :total="pagination.totalElements">
    </el-pagination>

    <purchase-form ref="purchaseForm" @close="handleEditFormClose"></purchase-form>

    <router-view></router-view>

  </div>
</template>

<script>
  import * as $service from "../../api/purchase"
  import BaseListComp from "../../components/BaseListComp";
  import PurchaseForm from "./purchaseForm";
  import PurchaseDetail from "./purchaseDetail";

  export default {
    name: "purchase",
    extends: BaseListComp,
    components:{
      PurchaseDetail,
      PurchaseForm,
    },
    data(){
      return {
        productList:[],
        supplierList:[],
        query:{
          page: 0,
          size: 10,
          sort: 'order,asc',
          serialNum:''
        }
      }
    },
    watch:{
      'query.serialNum'(){
        this.getListData();
      }
    },
    methods:{

      getService(){
        return $service;
      },

      showDetailPanel(row, event, column){
        event.stopPropagation();
        this.$router.push({ path:'/purchase/' + row.id });
      },

      handleEdit(item){
        this.$refs.purchaseForm.open({ item: item });
      },

      getProductLabel(id){
        let result = this.productList.filter((item,index,array) => {
          return item.id == id;
        });
        if(result.length == 0) return "";
        let item = result[0];
        return item.name+" - "+item.type+" - "+item.packing;
      },

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
