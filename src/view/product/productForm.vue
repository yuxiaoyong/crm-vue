<template>
  <div @click="$event.stopPropagation();">
    <el-dialog title="添加/修改产品" :visible.sync="dialogEditFormVisible" width="60%" :fullscreen="true" @close="handleClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" class="demo-ruleForm">
        <el-row>
          <el-col :span="24">
            <p class="form-title">产品信息</p>
          </el-col>
          <el-col :span="24">
            <el-form-item label="产品名称" prop="name" label-width="120px">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="产品型号" prop="type" label-width="120px">
              <el-input v-model="editForm.type"></el-input>
            </el-form-item>
            <el-form-item label="产品型号" prop="packing" label-width="120px">
              <el-select-dict dict-type="packing" v-model="editForm.packing"></el-select-dict>
            </el-form-item>
            <el-form-item label="产品排序" prop="order" label-width="120px">
              <el-input-number v-model="editForm.order" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="进货单价(未税)" prop="purchasePrice" label-width="120px">
              <el-input v-model="editForm.purchasePrice"></el-input>
            </el-form-item>
            <el-form-item label="销售单价(含税)" prop="sellingPrice" label-width="120px">
              <el-input v-model="editForm.sellingPrice"></el-input>
            </el-form-item>
            <el-form-item label="产品简介" prop="introduction" label-width="120px">
              <el-input v-model="editForm.introduction" type="textarea" :rows="4" auto-complete="off"></el-input>
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

  import * as $service from "../../api/product"
  import BaseFormComp from "../../components/BaseFormComp";

  export default {
    name: "productForm",
    extends: BaseFormComp,
    data(){
      return {
        editForm: {
          name:'',
          type:'',
          packing:'',
          order:0,
          purchasePrice:0,
          sellingPrice:0,
          introduction:''
        },
        editFormRules: {
          name: [
            {required: true, message: '产品名称不能为空', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '产品型号不能为空', trigger: 'blur'}
          ],
          packing: [
            {required: true, message: '产品规格不能为空', trigger: 'blur'}
          ],
          purchasePrice: [
            {required: true, message: '进货单价不能为空', trigger: 'blur'}
          ],
          sellingPrice: [
            {required: true, message: '销售单价不能为空', trigger: 'blur'}
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
