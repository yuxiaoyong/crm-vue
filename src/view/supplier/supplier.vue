<template>
  <div>

    <el-row class="el-action-bar" type="flex">

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
        <el-table-column prop="name" sortable="custom" fixed min-width="200" label="单位名称">
          <template slot-scope="scope">
            <el-button size="mini" type="text">{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="contact" sortable="custom" min-width="100" label="联系人">
          <template slot-scope="scope">{{ scope.row.contact }}</template>
        </el-table-column>
        <el-table-column prop="mobile" sortable="custom" min-width="100" label="手机号码">
          <template slot-scope="scope">{{ scope.row.mobile }}</template>
        </el-table-column>
        <el-table-column prop="telephone" sortable="custom" min-width="100" label="电话号码">
          <template slot-scope="scope">{{ scope.row.telephone}}</template>
        </el-table-column>
        <el-table-column prop="qqNo" sortable="custom" min-width="100" label="QQ号码">
          <template slot-scope="scope">{{ scope.row.qqNo}}</template>
        </el-table-column>
        <el-table-column prop="wxNo" sortable="custom" min-width="100" label="微信号码">
          <template slot-scope="scope">{{ scope.row.wxNo}}</template>
        </el-table-column>
        <el-table-column prop="address" sortable="custom" min-width="150" label="单位地址">
          <template slot-scope="scope">{{ scope.row.address}}</template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑供货单位" placement="top">
              <el-button size="mini" type="warning" circle @click="handleEdit(scope.row)"><i class="el-icon-edit"></i></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除供货单位" placement="top">
              <el-button size="mini" type="danger" circle @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></el-button>
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

    <supplier-form ref="supplierForm" @close="handleEditFormClose"></supplier-form>

  </div>
</template>

<script>
  import * as $service from "../../api/supplier"
  import BaseListComp from "../../components/BaseListComp";
  import SupplierForm from "./supplierForm";

  export default {
    name: "supplier",
    extends: BaseListComp,
    components:{
      SupplierForm
    },
    data(){
      return {
        query:{
          page: 0,
          size: 10,
          sort: 'order,asc',
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

      getService(){
        return $service;
      },

      handleEdit(item){
        this.$refs.supplierForm.open({ item: item });
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
