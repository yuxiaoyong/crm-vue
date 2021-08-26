<template>
  <div @click="$event.stopPropagation();">
    <el-dialog title="添加/修改客户" :visible.sync="dialogEditFormVisible" width="60%" :fullscreen="true" @close="handleClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" class="demo-ruleForm">
        <el-row>
          <el-col :span="24">
            <p class="form-title">订单信息</p>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="customer.name" label-width="120px">
              <el-autocomplete v-model="editForm.customer.name" :fetch-suggestions="queryCustomer"  value-key="name" style="width:100%;"
                               @select="handleCustomerSelect" @blur="handleCustomerBlur" placeholder="请输入企业名称">
                <template slot-scope="{ item }">
                  <div class="name">{{ item.name }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订购时间" prop="orderTime" label-width="120px">
              <el-date-picker v-model="editForm.orderTime" type="date" style="width:100%;" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单价格" prop="orderPrice" label-width="120px">
              <el-input type="number" v-model="editForm.orderPrice" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="快递价格" prop="expressPrice" label-width="120px">
              <el-input type="number" v-model="editForm.expressPrice" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总价格" prop="totalPrice" label-width="120px">
              <el-input v-model="totalPrice" auto-complete="off" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="产品型号" label-width="120px">
              <el-button size="small" @click="addProduct()" type="primary">添加型号</el-button>
              <template v-for="record in editForm.orderProducts">
                <el-row style="margin-top: 5px;">
                  <el-col :span="6">
                    <el-select v-model="record.product.id" placeholder="请选择">
                      <el-option v-for="item in productList"
                        :key="item.type"
                        :label="item.type"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8" style="padding-left:5px;"><el-input-number :min="0" v-model="record.quantity"></el-input-number></el-col>
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

import * as $service from '../../api/order'
import * as $customer from '../../api/customer'
import * as $product from '../../api/product'
import BaseFormComp from '../../components/BaseFormComp'

export default {
  name: 'orderForm',
  extends: BaseFormComp,
  data () {
    return {
      productList: [],
      editForm: {
        customer: {
          id: null
        },
        oderTime: '',
        orderPrice: 0,
        expressPrice: 0,
        totalPrice: 0,
        expressNo: '',
        orderProducts: []
      },
      editFormRules: {
        customerId: [
          {required: true, message: '企业名称不能为空', trigger: 'blur'}
        ],
        orderTime: [
          {required: true, message: '获得时间不能为空', trigger: 'blur'}
        ],
        orderPrice: [
          {required: true, message: '客户状态不能为空', trigger: 'blur'}
        ],
        expressPrice: [
          {required: true, message: '客户等级不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    totalPrice () {
      return parseInt(this.editForm.orderPrice) + parseInt(this.editForm.expressPrice)
    }
  },
  methods: {

    initialize () {
      this._editForm = this.$lodash.cloneDeep(this.editForm)
      this.getProductList()
    },

    getService () {
      return $service
    },

    addProduct () {
      this.editForm.orderProducts.push({
        customerId: this.editForm.id,
        product: {},
        number: 0
      })
    },

    deleteProduct (item) {
      this.editForm.orderProducts.forEach((product, index) => {
        if (product === item) {
          this.editForm.orderProducts.splice(index, 1)
        }
      })
    },

    getProductList () {
      $product.findList({page: 0, size: 100}).then((res) => {
        this.productList = res.data.content
      })
    },

    queryCustomer (queryString, cb) {
      $customer.findList({ name: queryString, page: 0, size: 20 }).then((res) => {
        cb(res.data.content)
      })
    },

    handleCustomerSelect (item) {
      this.editForm.customer = item
    },

    handleCustomerBlur () {
      if (this.editForm.customer.name === '') {
        this.editForm.customer = this.$lodash.cloneDeep(this._editForm.customer)
      }
      setTimeout(() => {
        this.$refs['editForm'].validateField('customer.name')
      }, 200)
    }

  }
}
</script>

<style scoped>

</style>
