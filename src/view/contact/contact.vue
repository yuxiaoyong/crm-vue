<template>
  <div class="contact-list-page">

    <el-row class="el-action-bar" type="flex">

      <el-col :span="16">
        <el-button-group>
          <el-button @click="handleEdit" size="small"><i class="el-icon-plus" style="font-weight: bold;font-size:14px;color:#409EFF;"></i> 添加</el-button>
          <el-button @click="handleDeleteSelected" size="small"><i class="el-icon-close" style="font-weight: bold;font-size:14px;color:#FF6873;"></i> 删除</el-button>
        </el-button-group>
        <el-button-group>
          <el-button size="small"><i class="el-icon-upload2" style="font-weight: bold;font-size:14px;color:#3FBC9C;"></i> 导出</el-button>
          <el-upload style="float:left;height: 34px;" class="upload-demo" action="" :http-request="importContact" :show-file-list="false">
            <el-button size="small"><i class="el-icon-download" style="font-weight: bold;font-size:14px;color:#FF6873;"></i> 导入</el-button>
          </el-upload>
        </el-button-group>
      </el-col>

      <el-col :span="8" style="padding-right:10px;">
        <el-input placeholder="请输入联系人/手机号/企业名称/客户地址" v-model="query.keyword">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-button size="small" @click="showSearchPanel($event)"><i class="el-icon-menu" style="font-weight: bold;"></i></el-button>

    </el-row>

    <template>
      <el-table border style="width: 100%; margin-top: 20px" v-loading="loading" element-loading-text="拼命加载中" :highlight-current-row="true"
                :data="pagination.content" :row-class-name="tableRowClassName" @sort-change="handleSortChange"
                @selection-change="handleSelectionChange" @row-click="showDetailPanel">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="realname" sortable="custom" label="联系人" fixed width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="text">{{ scope.row.realname }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="customer.name" sortable="custom" label="企业名称" fixed min-width="250" :show-overflow-tooltip="true">
          <template slot-scope="scope">{{scope.row.customer.name}}</template>
        </el-table-column>
        <el-table-column prop="mobile" sortable="custom" label="手机号码" width="150">
          <template slot-scope="scope">{{ scope.row.mobile }}</template>
        </el-table-column>
        <el-table-column prop="telephone" label="座机号码"  width="150" :show-overflow-tooltip="true">
          <template slot-scope="scope">{{ scope.row.telephone }}</template>
        </el-table-column>
        <el-table-column prop="fax" sortable="custom" label="传真号码" width="150">
          <template slot-scope="scope">{{ scope.row.fax }}</template>
        </el-table-column>
        <el-table-column prop="types" label="产品型号" width="180">
          <template slot-scope="scope">
            <el-tag v-for="product in scope.row.customer.products" style="margin-right: 5px;">{{getProductLabel(product)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="customer.status" sortable="custom" label="客户状态" width="120">
          <template slot-scope="scope">{{ scope.row.customer.status}}</template>
        </el-table-column>
        <el-table-column prop="customer.gainTime" sortable="custom" label="获得时间" width="120">
          <template slot-scope="scope">{{ formatTime(scope.row.customer.gainTime, 'YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑联系人" placement="top">
              <el-button size="mini" type="warning" circle @click="handleEdit(scope.row, $event)"><i class="el-icon-edit"></i></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除联系人" placement="top">
              <el-button size="mini" type="danger" circle @click="handleDelete(scope.row, $event)"><i class="el-icon-delete"></i></el-button>
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

    <el-pop-panel ref="searchPanel" width="350px">
      <el-form label-width="80px" label-position="top">
        <div style="margin-bottom: 20px;">
          <el-button size="medium" plain type="danger" @click="resetSearch()" style="width:100%;">重置</el-button>
        </div>
        <el-form-item label="关键词搜索">
          <el-input v-model="query.keyword" placeholder="请输入联系人/手机号/企业名称/客户地址"></el-input>
        </el-form-item>
        <el-form-item label="客户状态">
          <el-radio-group v-model="query.status" size="small">
            <el-radio-button v-for="status in statusList" :label="status.dictLabel" >{{status.dictLabel}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="产品类型">
          <el-radio-group v-model="query.productId" size="small">
            <el-radio v-for="product in productList" :label="product.id" border style="width:100px;margin:0px 10px 5px 0px;">{{product.type}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-pop-panel>

    <contact-form ref="contactForm" @close="handleEditFormClose"></contact-form>
    <input type="file" ref="contactImportFile" @change="importContact($event)" style="display: none;"/>

    <router-view></router-view>

  </div>
</template>

<script>
  import * as $dictionary from "../../api/dictionary"
  import * as $service from "../../api/contact"
  import * as $product from "../../api/product"
  import contactForm from './contactForm'
  import BaseListComp from "../../components/BaseListComp";

  export default {
    name: "contact",
    extends: BaseListComp,
    components:{
      contactForm
    },
    watch:{
      "query.keyword": function(){
        this.query.page = 0;
        this.getListData();
      },
      "query.status": function(){
        this.query.page = 0;
        this.getListData();
      },
      "query.productId": function(){
        this.query.page = 0;
        this.getListData();
      }
    },
    data(){
      return {
        statusList:[],
        productList:[],
        defaultSort: 'createTime,desc',
        query:{
          page: 0,
          size: 10,
          sort: 'createTime,desc',
          keyword: null,
          status: null,
          productId:null
        }
      }
    },
    methods:{

      initialize(){
        $dictionary.findList({dictType: "customer_status", page:0, size: 100}).then((res) => {
          this.statusList = res.data.content;
        });
        $product.findList({ page:0, size: 100 }).then((res) => {
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

      importContact(params){
        const loading = this.$loading({
          lock: true,
          text: '数据导入中',
          target: '.contact-list-page'
        });
        $service.importContact(params.file).then(() => {
          this.$message({
            type: 'success',
            message: '导入成功!'
          });
          this.getListData();
          loading.close();
        });
      },

      showSearchPanel(event){
        event.stopPropagation();
        this.$refs.searchPanel.show();
      },

      showDetailPanel(row, event, column){
        event.stopPropagation();
        this.$router.push({ path:'/contact/' + row.id });
      },

      resetSearch(){
        this.query.page = 0;
        this.query.keyword = "";
        this.query.status = "";
        this.query.productId = "";
        this.getListData();
      },

      handleEdit(item, $event){
        if($event) {
          $event.stopPropagation();
        }
        if(item) {
          this.$refs.contactForm.open({contact: item, customer: item.customer});
        }else{
          this.$refs.contactForm.open({contact: null, customer: null});
        }
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
