<template>
  <div @click="$event.stopPropagation();">
  <el-dialog title="添加/修改跟进信息" :visible.sync="dialogVisible" width="60%" :fullscreen="true" @close="handleClose()">
    <el-form :model="editForm" :rules="editFormRules" ref="editForm" class="demo-ruleForm">
      <el-row>
        <el-col :span="24">
          <p class="form-title">跟进信息</p>
        </el-col>
        <el-col :span="12">
          <el-form-item label="跟进时间" prop="followTime" label-width="120px">
            <el-date-picker v-model="editForm.followTime" format="yyyy-MM-dd" value-format="timestamp" style="width:100%;" placeholder="请填写跟进时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="产品名称" prop="productName" label-width="120px">
            <el-input v-model="editForm.productName" placeholder="请填写产品名称"></el-input>
          </el-form-item>
          <el-form-item label="摩擦系数" prop="frictionScope" label-width="120px">
            <el-input v-model="editForm.frictionScope" placeholder="请填写摩擦系数"></el-input>
          </el-form-item>
          <el-form-item label="表面处理" prop="surfaceTreat" label-width="120px">
            <el-input v-model="editForm.surfaceTreat" placeholder="请填写表面处理"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系方式" prop="followType" label-width="120px">
            <el-select-dict v-model="editForm.followType" dict-type="follow_type" placeholder="请填写联系方式"></el-select-dict>
          </el-form-item>
          <el-form-item label="产品材料" prop="productMaterial" label-width="120px" style="width:100%;">
            <el-input v-model="editForm.productMaterial" placeholder="请填写产品材料"></el-input>
          </el-form-item>
          <el-form-item label="产品尺寸" prop="productSize" label-width="120px">
            <el-input v-model="editForm.productSize" auto-complete="off" placeholder="请填写产品尺寸"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="反馈信息" prop="feedback" label-width="120px">
            <el-input v-model="editForm.feedback" type="textarea" :rows="4" placeholder="请填写反馈信息"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="附件信息" label-width="120px">
            <el-upload-file ref="attachments" :file-list="editForm.attachments"></el-upload-file>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>

  import $lodash from "lodash"
  import * as $service from "../../api/follow"

  export default {
    name: "followForm",
    watch:{
      visible(val){
        this.dialogVisible = val;
      }
    },
    mounted(){
      this._editForm = this.$lodash.cloneDeep(this.editForm);
    },
    data(){
      return {
        dialogVisible: false,
        editForm: {
          followTime:"",
          followType:"",
          productName:"",
          productMaterial:"",
          productSize:"",
          surfaceTreat:"",
          frictionScope:"",
          feedback:"",
          contact:null,
          attachments:[]
        },

        editFormRules: {
          followTime: [
            { required: true, message: '跟进时间不能为空', trigger: 'blur' }
          ],
          followType:[
            { required: true, message: '联系方式不能为空', trigger: 'blur' }
          ],
          productName:[
            { required: true, message: '产品名称不能为空', trigger: 'blur' }
          ],
          feedback:[
            { required: true, message: '反馈信息不能为空', trigger: 'blur' }
          ]

        }

      }
    },
    methods:{
      open({ follow, contact }){
        this.resetForm('editForm');
        if(follow){
          this.editForm = this.$lodash.cloneDeep(follow);
        }else{
          this.editForm = this.$lodash.cloneDeep(this._editForm);
        }
        this.editForm.contact = contact;

        if(!follow) {
          $service.getLastFollow(contact.id).then((res) => {
            if (!res.data) return;
            this.editForm.productName = res.data.productName;
            this.editForm.productMaterial = res.data.productMaterial;
            this.editForm.productSize = res.data.productSize;
            this.editForm.surfaceTreat = res.data.surfaceTreat;
            this.editForm.frictionScope = res.data.frictionScope;
          });
        }

        this.dialogVisible = true;
      },
      handleClose(){
        this.$emit('close');
      },
      resetForm(formName) {
        if(this.$refs[formName]) {
          this.$nextTick(() => {
            this.$refs[formName].resetFields();
          });
        }
      },

      submitForm: $lodash.debounce(function(){
        let $this = this;
        $this.$refs['editForm'].validate((valid) => {
          if (!valid) return false;
          let loading = $this.$loading();
          $service.save($this.editForm).then(function(res){
            $this.dialogVisible = false;
            loading.close();
            $this.$message({
              type: 'success',
              message: '操作成功!'
            });
          }).catch(function(){
            loading.close();
          });
        });

      }, 200)

    }
  }
</script>

<style scoped>

</style>
