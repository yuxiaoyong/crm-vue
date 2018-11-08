<template>
  <div @click="$event.stopPropagation();">
    <el-dialog title="添加/修改客户" :visible.sync="dialogEditFormVisible" width="60%" :fullscreen="true" @close="handleClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" class="demo-ruleForm">
        <el-row>
          <el-col :span="24">
            <p class="form-title">公司信息</p>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="name" label-width="120px">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属行业" prop="trade" label-width="120px" style="width:100%;">
              <el-input v-model="editForm.trade" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户等级" prop="rank" label-width="120px">
              <el-select-rank v-model="editForm.rank"></el-select-rank>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户来源" prop="source" label-width="120px">
              <el-input v-model="editForm.source" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="获得时间" prop="gainTime" label-width="120px">
              <el-date-picker v-model="editForm.gainTime" type="date" style="width:100%;" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户状态" prop="status" label-width="120px">
              <el-select-dict v-model="editForm.status" dict-type="customer_status"></el-select-dict>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="客户简介" prop="introduction" label-width="120px">
              <el-input v-model="editForm.introduction" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="客户地址" prop="address" label-width="120px">
              <el-input v-model="editForm.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="产品型号" label-width="120px">
              <el-button size="small" @click="addProduct()" type="primary">添加型号</el-button>
              <template v-for="record in editForm.products">
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
                    <el-button type="danger" plain @click="deleteProduct(record)"><el-icon class="el-icon-close"></el-icon></el-button>
                  </el-col>
                  <el-col :span="8"></el-col>
                </el-row>
              </template>
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

  import * as $service from "../../api/customer"
  import * as $product from "../../api/product"
  import BaseFormComp from "../../components/BaseFormComp";

  export default {
    name: "customerForm",
    extends: BaseFormComp,
    data(){
      return {
        productList:[],
        editForm: {
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
        editFormRules: {
          name: [
            {required: true, message: '企业名称不能为空', trigger: 'blur'}
          ],
          gainTime:[
            {required: true, message: '获得时间不能为空', trigger: 'blur'}
          ],
          status:[
            {required: true, message: '客户状态不能为空', trigger: 'blur'}
          ],
          rank:[
            {required: true, message: '客户等级不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods:{

      initialize(){
        this._editForm = this.$lodash.cloneDeep(this.editForm);
        this.getProductList();
      },

      getService(){
        return $service;
      },

      addProduct(){
          this.editForm.products.push({
            customerId: this.editForm.id,
            product: null,
            number: 0
          });
      },

      deleteProduct(item){
        this.editForm.products.forEach((product, index) => {
            if(product == item){
              this.editForm.products.splice(index, 1);
            }
        });
      },

      getProductList(){
        $product.findList({page: 0, size: 100}).then((res) => {
            this.productList = res.data.content;
        });
      }

    }
  }
</script>

<style scoped>

</style>
