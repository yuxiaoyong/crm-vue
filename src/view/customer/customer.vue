<template>
  <div>

    <el-row class="el-action-bar">

      <el-col :span="16">
        <el-button-group>
          <el-button @click="handleEdit" size="small"><i class="el-icon-plus" style="font-weight: bold;font-size:14px;color:#409EFF;"></i> 添加</el-button>
          <el-button @click="handleDeleteSelected" size="small"><i class="el-icon-close" style="font-weight: bold;font-size:14px;color:#FF6873;"></i> 删除</el-button>
        </el-button-group>
      </el-col>

      <el-col :span="8" style="text-align: right;">
        <el-input placeholder="请输单位名称" v-model="query.name">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>

    </el-row>

    <template>
      <el-table border style="width: 100%; margin-top: 20px" v-loading="loading"
                :data="pagination.content" :row-class-name="tableRowClassName" @sort-change="handleSortChange" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="name" sortable="custom" label="企业名称">
          <template slot-scope="scope">
            <el-button size="mini" type="text">{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" sortable="custom" label="所在地址" :show-overflow-tooltip="true">
          <template slot-scope="scope">{{ scope.row.address }}</template>
        </el-table-column>
        <el-table-column prop="products" label="产品型号" width="180">
          <template slot-scope="scope">
            <el-tag v-for="product in scope.row.products" style="margin-right: 5px;">{{getProductLabel(product)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" sortable="custom" label="客户状态" width="120" :show-overflow-tooltip="true">
          <template slot-scope="scope">{{ scope.row.status}}</template>
        </el-table-column>
        <el-table-column prop="gainTime" sortable="custom" label="获得时间" width="120">
          <template slot-scope="scope">{{ formatTime(scope.row.gainTime, 'YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑企业" placement="top">
              <el-button size="mini" type="warning" circle @click="handleEdit(scope.row)"><i class="el-icon-edit"></i></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除企业" placement="top">
              <el-button size="mini" type="danger" circle @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="新建联系人" placement="top">
              <el-button size="mini" type="primary" circle @click="handleEditContact(scope.row)" ><i class="el-icon-plus"></i></el-button>
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

    <customer-form ref="customerForm" @close="handleEditFormClose"></customer-form>

    <contact-form ref="contactForm"></contact-form>

  </div>
</template>

<script>
  import * as $service from "../../api/customer"
  import * as $product from "../../api/product"
  import customerForm from "./customerForm"
  import contactForm from "../contact/contactForm"
  import BaseListComp from "../../components/BaseListComp";

  export default {
    name: "customer",
    extends: BaseListComp,
    components:{
      customerForm,
      contactForm
    },
    data(){
      let defaultSort = 'createTime,desc';
      return {
        productList:[],
        defaultSort: defaultSort,
        query:{
          page: 0,
          size: 10,
          sort: defaultSort,
          name:''
        }
      }
    },
    watch:{

      'query.name'(){
        this.getListData();
      }

    },
    methods:{

      initialize(){
        console.log("init====");
        $product.findList({page: 0, size: 100}).then((res) => {
          this.productList = res.data.content;
          this.getListData();
        });
      },

      getService(){
        return $service;
      },

      getProductLabel(product){
        let result = this.productList.filter((item, k, l) => {
          return item.id == product.productId;
        });
        if(result.length > 0){
          return result[0].type;
        }else{
          return "";
        }
      },

      handleEdit(item){
        this.$refs.customerForm.open({ item: item });
      },

      handleEditContact(customer){
        this.$refs.contactForm.open({ customer: customer });
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
