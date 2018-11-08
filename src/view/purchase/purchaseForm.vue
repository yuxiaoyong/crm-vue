<template>
  <div @click="$event.stopPropagation();hideRowEdit()">
    <el-dialog title="添加/修改订单信息" :visible.sync="dialogEditFormVisible" width="70%" :fullscreen="true" @close="handleClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" class="demo-ruleForm">
        <el-row>
          <el-col :span="24">
            <p class="form-title">订单信息</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="供货单位" prop="supplier.id" label-width="120px">
              <el-select v-model="editForm.supplier.id">
                <el-option v-for="item in supplierList" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单编号" prop="serialNum" label-width="120px">
              <el-input v-model="editForm.serialNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="下单时间" prop="orderDate" label-width="120px">
              <el-date-picker type="date" value-format="timestamp" v-model="editForm.orderDate" style="width:100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到货时间" prop="deliveryDate" label-width="120px">
              <el-date-picker type="date" value-format="timestamp" v-model="editForm.deliveryDate" style="width:100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="成交数量" prop="quantity" label-width="120px">
              <el-input type="number" v-model="editForm.quantity"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成交金额" prop="amount" label-width="120px">
              <el-input type="number" v-model="editForm.amount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-table :data="editForm.details" border style="width: 100%" @row-click="handleRowClick">
          <el-table-column fixed prop="product.name" label="产品名称" min-width="200">
            <template slot-scope="scope">
              <span v-if="!scope.row.editable">{{getProductLabel(scope.row.product.id)}}</span>
              <el-select v-else v-model="scope.row.product.id">
                <el-option v-for="item in productList" :label="getProductLabel(item.id)" :value="item.id">
                  {{getProductLabel(item.id)}}
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="quantity" label="数量" width="100">
            <template  slot-scope="scope">
              <span v-if="!scope.row.editable">{{scope.row.quantity}}</span>
              <el-input v-else type="number" v-model="scope.row.quantity"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="unitPrice" label="购货单价（元）" width="120">
            <template  slot-scope="scope">
              <span v-if="!scope.row.editable">{{scope.row.unitPrice}}</span>
              <el-input v-else type="number" v-model="scope.row.unitPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="totalPrice" label="购货金额（元）" width="120">
            <template  slot-scope="scope">
              <span>{{scope.row.unitPrice * scope.row.quantity}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" :show-overflow-tooltip="true" label="备注">
            <template  slot-scope="scope">
              <span v-if="!scope.row.editable">{{scope.row.remark}}</span>
              <el-input v-else v-model="scope.row.remark"></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="handleAddDetail(scope.row, $event)" size="small"><i class="el-icon-plus" style="font-weight: bold;font-size:14px;color:#409EFF;"></i></el-button>
              <el-button @click="handleDelDetail(scope.row, $event)" size="small"><i class="el-icon-close" style="font-weight: bold;font-size:14px;color:#FF6873;"></i></el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import * as $service from "../../api/purchase"
  import * as $product from "../../api/product"
  import * as $supplier from "../../api/supplier"
  import BaseFormComp from "../../components/BaseFormComp";

  export default {
    name: "purchaseForm",
    extends: BaseFormComp,
    data(){
      return {
        productList:[],
        supplierList:[],
        editForm: {
          serialNum:'',
          orderDate:null,
          deliveryDate: null,
          quantity: 0,
          amount: 0,
          supplier:{ name: '' },
          details:[]
        },
        editFormRules: {
          'supplier.id': [
            {required: true, message: '单位名称不能为空', trigger: 'blur'}
          ],
          serialNum: [
            {required: true, message: '订单编号不能为空', trigger: 'blur'}
          ],
          orderDate: [
            {required: true, message: '订单编号不能为空', trigger: 'blur'}
          ],
          quantity: [
            {required: true, message: '成交数量不能为空', trigger: 'blur'}
          ],
          amount: [
            {required: true, message: '成交金额不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    watch:{
      'editForm.details':{
        handler(val, oldval){
          this.editForm.quantity = 0;
          this.editForm.amount = 0;
          val.forEach((item) => {
            this.editForm.quantity += Number(item.quantity);
            this.editForm.amount += item.quantity * item.unitPrice;
          })
        },
        deep: true
      }
    },
    methods:{

      getService(){
        return $service;
      },
      afterInitialize(){
        $product.findList({page:0, size: 100}).then((res) => {
          this.productList = res.data.content;
        });
        $supplier.findList({page:0, size: 100}).then((res) => {
          this.supplierList = res.data.content;
        });
      },
      afterOpen(){
        if(this.editForm.details.length == 0) {
          this.addPurchaseDetail();
        }
      },
      hideRowEdit(){
        this.editForm.details.forEach((detail) => {
          this.$set(detail, 'editable', false);
        });
      },
      handleRowClick(row, event, column){
        event.stopPropagation();
        this.hideRowEdit();
        this.$set(row, 'editable', true);
      },
      handleAddDetail(row, event){
        event.stopPropagation();
        this.addPurchaseDetail();
      },
      handleDelDetail(row, event){
        event.stopPropagation();
        if(this.editForm.details.length <=1 ){
          return;
        }
        this.editForm.details.forEach((record, idx) => {
          if(record == row){
            this.editForm.details.splice(idx, 1);
          }
        })
      },
      addPurchaseDetail(){
        this.editForm.details.push({
          product:{},
          quantity: 0,
          unitPrice: 0,
          remark:""
        });
      },

      getProductLabel(id){
        let result = this.productList.filter((item,index,array) => {
          return item.id == id;
        });
        if(result.length == 0) return "";
        let item = result[0];
        return item.name+" - "+item.type+" - "+item.packing;
      },

      afterValidate(){
        return new Promise((resolve, reject) => {
          for(let i=0; i< this.editForm.details.length; i++){
            let detail = this.editForm.details[i];
            if(!detail.product.id){
              this.$set(detail, 'editable', true);
              return reject(false);
            }

            if(!detail.quantity){
              this.$set(detail, 'editable', true);
              return reject(false);
            }

            if(!detail.unitPrice){
              this.$set(detail, 'editable', true);
              return reject(false);
            }

          }
          return resolve(true);
        });
      }

    }
  }
</script>

<style scoped>

</style>
