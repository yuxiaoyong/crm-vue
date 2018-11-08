<template>
  <div @click="$event.stopPropagation();">
    <el-dialog title="添加/修改联系人" :visible.sync="dialogVisible" width="60%" :fullscreen="true" @close="handleClose()">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" class="demo-ruleForm">
        <el-row>
          <el-col :span="24">
            <p class="form-title">公司信息</p>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="customer.name" label-width="120px">
              <el-autocomplete v-model="editForm.customer.name" :fetch-suggestions="queryCustomer"  value-key="name" style="width:100%;"
                               @select="handleCustomerSelect" @blur="handleCustomerBlur" placeholder="请输入企业名称">
                <template slot-scope="{ item }">
                  <div class="name">{{ item.name }}</div>
                </template>
              </el-autocomplete>
              <!--<el-input v-model="editForm.customer.name" auto-complete="off"></el-input>-->
            </el-form-item>
            <el-form-item label="客户等级" prop="customer.rank" label-width="120px">
              <el-select-rank v-model="editForm.customer.rank"></el-select-rank>
              <!--<el-input v-model="editForm.customer.rank" auto-complete="off"></el-input>-->
            </el-form-item>
            <el-form-item label="获得时间" prop="customer.gainTime" label-width="120px">
              <el-date-picker v-model="editForm.customer.gainTime" type="date" style="width:100%;" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属行业" prop="customer.trade" label-width="120px" style="width:100%;">
              <el-input v-model="editForm.customer.trade" auto-complete="off"></el-input>
              <!--<el-select-dict v-model="editForm.customer.trade" dict-type="trade"></el-select-dict>-->
            </el-form-item>
            <el-form-item label="客户来源" prop="customer.source" label-width="120px">
              <el-input v-model="editForm.customer.source" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="客户状态" prop="customer.status" label-width="120px">
              <el-select-dict v-model="editForm.customer.status" dict-type="customer_status"></el-select-dict>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="客户简介" prop="customer.introduction" label-width="120px">
              <el-input v-model="editForm.customer.introduction" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="客户地址" prop="customer.address" label-width="120px">
              <el-input v-model="editForm.customer.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="产品型号" label-width="120px">
              <el-button size="small" @click="addProduct()" type="primary">添加型号</el-button>
              <template v-for="record in editForm.customer.products">
                <el-row style="margin-top: 5px;">
                  <el-col :span="6">
                    <el-select v-model="record.productId" placeholder="请选择">
                      <el-option v-for="item in productList"
                                 :key="item.type"
                                 :label="item.type"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8" style="padding-left:5px;"><el-input-number :min="0" v-model="record.number"></el-input-number></el-col>
                  <el-col :span="2">
                    <el-button size="medium" @click="deleteProduct(record)"><el-icon class="el-icon-close"></el-icon></el-button>
                  </el-col>
                  <el-col :span="8"></el-col>
                </el-row>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <p class="form-title">联系人信息</p>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="contact.realname" label-width="120px">
              <el-input v-model="editForm.contact.realname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="contact.mobile" label-width="120px">
              <el-input v-model="editForm.contact.mobile" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="contact.email" label-width="120px">
              <el-input v-model="editForm.contact.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="QQ号" prop="contact.qqNo" label-width="120px">
              <el-input v-model="editForm.contact.qqNo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="传真" prop="contact.fax" label-width="120px">
              <el-input v-model="editForm.contact.fax" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="contact.gender" label-width="120px">
              <el-select-dict v-model="editForm.contact.gender" dict-type="gender"></el-select-dict>
            </el-form-item>
            <el-form-item label="座机号码" prop="contact.telephone" label-width="120px">
              <el-input v-model="editForm.contact.telephone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户职务" prop="contact.post" label-width="120px">
              <el-input v-model="editForm.contact.post" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="微信号" prop="contact.wxNo" label-width="120px">
              <el-input v-model="editForm.contact.wxNo" auto-complete="off"></el-input>
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
  import * as $service from "../../api/contact"
  import * as $customer from "../../api/customer"
  import * as $product from "../../api/product"

  export default {
    name: "followForm",
    mounted(){
      this.getProductList();
      this._editForm = this.$lodash.cloneDeep(this.editForm);
    },
    data(){
      return {
        dialogVisible: false,
        timeout: null,
        editForm: {
          customer:{
            id:null,
            name:'',
            address:'',
            trade:'',
            rank:'',
            introduction:'',
            source:'',
            gainTime:'',
            status:'',
            products:[]
          },
          contact:{
            realname:'',
            gender:'',
            mobile:'',
            telephone:'',
            email:'',
            qqNo:'',
            wxNo:'',
            post:''
          }
        },
        editFormRules: {
          'customer.name': [
            {required: true, message: '企业名称不能为空', trigger: 'blur'}
          ],
          'customer.gainTime':[
            {required: true, message: '获得时间不能为空', trigger: 'blur'}
          ],
          'customer.status':[
            {required: true, message: '客户状态不能为空', trigger: 'blur'}
          ],
          'customer.rank':[
            {required: true, message: '客户等级不能为空', trigger: 'blur'}
          ],
          'contact.realname': [
            {required: true, message: '联系人姓名不能为空', trigger: 'blur'}
          ],
          'contact.mobile': [
            {required: true, message: '联系人手机不能为空', trigger: 'blur'}
          ],
          'contact.gender': [
            {required: true, message: '联系人性别不能为空', trigger: 'blur'}
          ]
        }

      }
    },
    methods:{
      open({ contact, customer }){
        this.dialogVisible = true;
        this.resetForm('editForm');
        this.$nextTick(() => {

          this.editForm = this.$lodash.cloneDeep(this._editForm);
          if(contact){
            this.editForm.contact = this.$lodash.cloneDeep(contact);
          }
          if(customer && !customer.deleted) {
            this.editForm.customer = this.$lodash.cloneDeep(customer);
          }

        });
      },
      close(){
        this.dialogVisible = false;
      },
      handleClose(){
        this.$emit('close');
      },

      queryCustomer(queryString, cb){
        $customer.findList({ name: queryString, page:0, size: 20 }).then((res) => {
          cb(res.data.content);
        });

      },

      handleCustomerSelect(item){
        this.editForm.customer = item;
      },

      handleCustomerBlur(){
        if(this.editForm.customer.name == '') {
          this.editForm.customer = this.$lodash.cloneDeep(this._editForm.customer);
        }
        setTimeout(() => {
          this.$refs['editForm'].validateField('customer.name');
        }, 200)

      },

      addProduct(){
        this.editForm.customer.products.push({
          customerId: this.editForm.customer.id,
          product: null,
          number: 0
        });
      },

      deleteProduct(item){
        this.editForm.customer.products.forEach((product, index) => {
          if(product == item){
            this.editForm.customer.products.splice(index, 1);
          }
        });
      },

      getProductList(){
        $product.findList({page: 0, size: 100}).then((res) => {
          this.productList = res.data.content;
        });
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
          $this.editForm.contact.customer = $this.editForm.customer;
          $service.save($this.editForm.contact).then(function(res){
            $this.dialogVisible = false;
            loading.close();
            $this.$message({
              type: 'success',
              message: '操作成功!'
            });
            $this.getListData();
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
