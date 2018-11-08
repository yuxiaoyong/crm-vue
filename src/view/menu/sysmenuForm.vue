<template>
  <div @click="$event.stopPropagation();">
    <el-dialog title="添加/修改菜单" :visible.sync="dialogEditFormVisible" width="60%" :fullscreen="true" @close="handleClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" class="demo-ruleForm">
        <el-row>
          <el-col :span="24">
            <p class="form-title">菜单信息</p>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="name" label-width="120px">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单编码" prop="code" label-width="120px" style="width:100%;">
              <el-input v-model="editForm.code" auto-complete="off"></el-input>
              <!--<el-select-dict v-model="editForm.customer.trade" dict-type="trade"></el-select-dict>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单目标" prop="target" label-width="120px">
              <el-input v-model="editForm.target" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单图标" prop="iconClass" label-width="120px">
              <el-input v-model="editForm.iconClass" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="外部菜单" prop="external" label-width="120px" style="width:100%;">
              <el-switch v-model="editForm.external"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否可见" prop="visible" label-width="120px" style="width:100%;">
              <el-switch v-model="editForm.visible"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单权限" prop="permission" label-width="120px" style="width:100%;">
              <el-input v-model="editForm.permission" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单排序" prop="order" label-width="120px" style="width:100%;">
              <el-input-number v-model="editForm.order" :min="0" :max="10000" label="描述文字"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单路径" prop="path" label-width="120px">
              <el-input v-model="editForm.path" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import * as $service from "../../api/menu"
  import BaseFormComp from "../../components/BaseFormComp";

  export default {
    name: "sysmenuForm",
    extends: BaseFormComp,
    data(){
      return {
        editForm: {
          name:'',
          code:'',
          path:'',
          target:'',
          external:false,
          iconClass:'',
          permission:'',
          visible:true,
          order:0,
          parent:null
        },
        editFormRules: {
          name: [
            {required: true, message: '菜单名称不能为空', trigger: 'blur'}
          ],
          code:[
            {required: true, message: '菜单编码不能为空', trigger: 'blur'}
          ],
          order:[
            {required: true, message: '菜单排序不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods:{

      getService(){
        return $service;
      },

      open({ item, parent }){

        if(this.$refs['editForm']) {
          this.$refs['editForm'].resetFields();
        }
        if(item){
          this.editForm = this.$lodash.cloneDeep(item);
          this.editForm.children = [];
        }else{
          this.editForm = this.$lodash.cloneDeep(this._editForm);
        }
        this.editForm.parent = this.$lodash.cloneDeep(parent);
        this.dialogEditFormVisible = true;

      }

    }
  }
</script>

<style scoped>
  .form-title{
    display: block;
    height: 30px;
    background-color:#EEEEEE;
    line-height:30px;
    padding-left:10px;
  }
</style>
