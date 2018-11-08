<template>
  <div @click="$event.stopPropagation();">
    <el-dialog title="添加/修改进货单位" :visible.sync="dialogEditFormVisible" width="60%" :fullscreen="true" @close="handleClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" class="demo-ruleForm">
        <el-row>
          <el-col :span="24">
            <p class="form-title">进货单位信息</p>
          </el-col>
          <el-col :span="24">
            <el-form-item label="单位名称" prop="name" label-width="120px">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contact" label-width="120px">
              <el-input v-model="editForm.contact"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile" label-width="120px">
              <el-input v-model="editForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="telephone" label-width="120px">
              <el-input v-model="editForm.telephone"></el-input>
            </el-form-item>
            <el-form-item label="QQ号码" prop="qqNo" label-width="120px">
              <el-input v-model="editForm.qqNo"></el-input>
            </el-form-item>
            <el-form-item label="微信号码" prop="wxNo" label-width="120px">
              <el-input v-model="editForm.wxNo"></el-input>
            </el-form-item>
            <el-form-item label="单位地址" prop="address" label-width="120px">
              <el-input v-model="editForm.address"></el-input>
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

  import * as $service from "../../api/supplier"
  import BaseFormComp from "../../components/BaseFormComp";

  export default {
    name: "supplierForm",
    extends: BaseFormComp,
    data(){
      return {
        editForm: {
          name:'',
          contact:'',
          mobile:'',
          telephone:'',
          qqNo:'',
          wxNo:'',
          address:''
        },
        editFormRules: {
          name: [
            {required: true, message: '单位名称不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods:{
      getService(){
        return $service;
      }
    }
  }
</script>

<style scoped>

</style>
