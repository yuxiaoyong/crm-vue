<template>
    <el-pop-panel ref="detailPanel" width="60%" @close="handlePanelClose" v-loading="loading">
      <el-form :model="detail" ref="editForm" class="demo-ruleForm">
        <el-row>
          <el-col :span="24">
            <p class="form-title">供货合同</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="供货单位" prop="supplier.name" label-width="120px">
              <el-input v-model="detail.supplier.name" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单编号" prop="serialNum" label-width="120px">
              <el-input v-model="detail.serialNum" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="下单时间" prop="orderDate" label-width="120px">
              <el-date-picker type="date" value-format="timestamp" v-model="detail.orderDate" :readonly="true" style="width:100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到货时间" prop="deliveryDate" label-width="120px">
              <el-date-picker type="date" value-format="timestamp" v-model="detail.deliveryDate" :readonly="true" style="width:100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="成交数量" prop="quantity" label-width="120px">
              <el-input type="number" v-model="detail.quantity" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成交金额" prop="amount" label-width="120px">
              <el-input type="number" v-model="detail.amount" :readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-table :data="detail.details" border style="width: 100%">
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
        </el-table>

      </el-form>
    </el-pop-panel>
</template>

<script>

  import * as $service from "../../api/purchase"
  import * as $product from "../../api/product"

  export default {
    name: "purchaseDetail",
    mounted(){
      this.$refs.detailPanel.show();
      $product.findList({page:0, size: 100}).then((res) => {
        this.productList = res.data.content;
      });
      this.getDetailInfo();
    },
    data(){
      return {
        loading: false,
        productList:[],
        detail:{
          supplier:{},
          details:[]
        }
      }
    },
    methods:{
      getDetailInfo(){
        let id = this.$route.params.id;
        this.loading = true;
        $service.findById(id).then((res) => {
          this.detail = res.data;
        });
        setTimeout(() => {
          this.loading = false;
        }, 300);
      },

      handlePanelClose(){
        this.$router.push({ path:'/purchase'});
      },

      getProductLabel(id){
        let result = this.productList.filter((item,index,array) => {
          return item.id == id;
        });
        if(result.length == 0) return "";
        let item = result[0];
        return item.name+" - "+item.type+" - "+item.packing;
      }

    }
  }
</script>

<style scoped>

</style>
