<template>
  <div @click="$event.stopPropagation();">
    <el-dialog title="添加/修改客户" :visible.sync="dialogEditFormVisible" width="60%" :fullscreen="true" @close="handleClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" class="demo-ruleForm">
        <el-row>
          <el-col :span="24">
            <p class="form-title">库存信息</p>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称" prop="product.id" label-width="120px">
              <el-select v-model="editForm.product.id" placeholder="请选择">
                <el-option v-for="item in productList"
                           :key="item.type"
                           :label="item.type"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="变更时间" prop="changeTime" label-width="120px">
              <el-date-picker v-model="editForm.changeTime" type="datetime" style="width:100%;" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="变更数量" prop="changeQuantity" label-width="120px">
              <el-input type="number" v-model="editForm.changeQuantity" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="变更类型" prop="changeType" label-width="120px">
              <el-select v-model="editForm.changeType">
                <el-option value="MANUAL" label="人为调整"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="变更说明" prop="remark" label-width="120px">
              <el-input type="textarea" v-model="editForm.remark" auto-complete="off" rows="3"></el-input>
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

import * as $service from '../../api/stock'
import * as $customer from '../../api/customer'
import * as $product from '../../api/product'
import BaseFormComp from '../../components/BaseFormComp'

export default {
  name: 'stockForm',
  extends: BaseFormComp,
  data () {
    return {
      productList: [],
      editForm: {
        product: {id: null},
        changeTime: '',
        changeQuantity: '',
        changeType: '',
        remark: ''
      },
      editFormRules: {
        'product.name': [
          {required: true, message: '产品名称不能为空', trigger: 'blur'}
        ],
        changeTime: [
          {required: true, message: '变更时间不能为空', trigger: 'blur'}
        ],
        changeQuantity: [
          {required: true, message: '变更数量不能为空', trigger: 'blur'}
        ],
        changeType: [
          {required: true, message: '变更类型不能为空', trigger: 'blur'}
        ]
      }
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
