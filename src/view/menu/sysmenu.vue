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
        <el-input placeholder="请输入字典标签" v-model="query.dictLabel">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>

    </el-row>

    <el-table v-if="reset" border style="width: 100%; margin-top: 20px" v-loading="loading"
              :data="menuDataList" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="菜单名称" fixed min-width="200">
        <template slot-scope="scope">
            <span :style="'margin-left:'+scope.row.level*30+'px'" size="mini" type="text">
              <i v-if="scope.row.expanded" :class="scope.row.leaf? 'el-icon-caret-bottom icon-expand-hidden': 'el-icon-caret-bottom icon-expand-visible'" @click="handleCollapse(scope.row)"></i>
              <i v-else :class="scope.row.leaf? 'el-icon-caret-right icon-expand-hidden': 'el-icon-caret-right icon-expand-visible'" @click="handleExpand(scope.row)"></i>
              <i class="el-icon-menu"></i> {{ scope.row.name }}
            </span>
        </template>
      </el-table-column>
      <el-table-column prop="visible" label="是否显示" width="80">
        <template slot-scope="scope">{{scope.row.visible?'是':'否'}}</template>
      </el-table-column>
      <el-table-column prop="permission" label="菜单权限">
        <template slot-scope="scope">{{scope.row.permission}}</template>
      </el-table-column>
      <el-table-column prop="path" label="菜单路径">
        <template slot-scope="scope">{{scope.row.path}}</template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑菜单" placement="top">
            <el-button size="mini" type="warning" circle @click="handleEdit(scope.row, scope.row.parent)"><i class="el-icon-edit"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除菜单" placement="top">
            <el-button size="mini" type="danger" circle @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="添加子菜单" placement="top">
            <el-button size="mini" type="primary" circle @click="handleEdit(null, scope.row)" ><i class="el-icon-plus"></i></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <sysmenu-form ref="sysmenuForm" @close="handleEditFormClose"></sysmenu-form>

  </div>
</template>

<script>
  import * as $service from "../../api/menu"
  import BaseListComp from "../../components/BaseListComp"
  import SysmenuForm from "./sysmenuForm";

  export default {
    components: { SysmenuForm },
    extends: BaseListComp,
    name: "sysmenu",
    data(){
      return {
        rootMenu:null,
        menuList: [],
        reset: true
      }
    },
    computed:{
      menuDataList(){
        return this.processData(this.menuList, 0);
      }
    },
    methods:{
      getService(){
        return $service;
      },
      handleEdit(item, parent){
        if(parent) {
          this.$refs.sysmenuForm.open({item: item, parent: {id: parent.id}});
        }else{
          this.$refs.sysmenuForm.open({item: item, parent: {id: this.rootMenu.id}});
        }
      },
      getListData(){
        this.loading = true;
        $service.findRootMenu().then((res) => {
          if(res.data){
            this.rootMenu = res.data;
            this.menuList = res.data.children;
          }
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        })
      },

      processData(menuList, level, parent){
        let arr = [];
        menuList.forEach((menu) => {
          menu.level = level;
          menu.expanded = true;
          menu.leaf = false;
          menu.parent = parent;
          arr.push(menu);
          if(menu.children && menu.children.length > 0){
            let children = this.processData(menu.children, level+1, menu);
            arr = arr.concat(children);
          }else{
            menu.leaf = true;
          }
        });
        return arr;
      },

      tableRowClassName({ row, rowIndex }){
        if(row.parent && row.parent.expanded || !row.parent){
          return "";
        }else{
          return "hidden-row";
        }
      },

      handleCollapse(row){
        row.expanded = false;
        this.updateTableUI();
      },

      handleExpand(row){
        row.expanded = true;
        this.updateTableUI();
      },

      updateTableUI(){
        this.reset = false;
        this.$nextTick(() => {
          this.reset  = true;
        })
      }

    }

  }
</script>

<style>
  .el-table .success-row {
    background: #f0f9eb;
  }

</style>
