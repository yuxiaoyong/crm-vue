<template>
  <div>

    <el-row class="el-action-bar" type="flex">

      <el-col :span="16">
        <el-button-group>
          <el-button @click="handleEdit" size="small"><i class="el-icon-plus" style="font-weight: bold;font-size:14px;color:#409EFF;"></i> 添加</el-button>
          <el-button @click="handleDeleteSelected" size="small"><i class="el-icon-close" style="font-weight: bold;font-size:14px;color:#FF6873;"></i> 删除</el-button>
          <el-button @click="resetSearch" size="small"><i class="el-icon-refresh" style="font-weight: bold;font-size:14px;color:#FF6873;"></i> 重置查询</el-button>
        </el-button-group>
      </el-col>

      <el-col :span="8" style="text-align: right;">
        <el-input placeholder="请输入字典标签" v-model="query.dictLabel">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>

    </el-row>

    <template>
      <el-table border style="width: 100%; margin-top: 20px" v-loading="loading" :size="tableSize"
                :data="pagination.content" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="dictType" label="字典类型">
          <template slot-scope="scope">
              <el-button @click="filterByType(scope.row.dictType)" size="mini" type="text">{{ scope.row.dictType }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="dictLabel" label="字典标签"></el-table-column>
        <el-table-column prop="dictValue" label="字典值"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑字典项" placement="top">
              <el-button size="mini" type="warning" circle @click="handleEdit(scope.row)"><i class="el-icon-edit"></i></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除字典项" placement="top">
              <el-button size="mini" type="danger" circle @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="添加字典项" placement="top">
              <el-button size="mini" type="primary" circle @click="handleEdit({dictType: scope.row.dictType})" ><i class="el-icon-plus"></i></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-pagination :current-page="query.page+1" :page-sizes="[10, 20, 50]" :page-size="query.size" style="margin-top:10px;"
                   layout="total, sizes, prev, pager, next, jumper"
                   @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   prev-text="上一页" next-text="下一页" :background="true" :total="pagination.totalElements">
    </el-pagination>

    <el-dialog title="添加/修改字典项" :visible.sync="dialogEditFormVisible" width="600px">
      <el-form :model="editForm" :rules="editFormRules" ref="editForm" class="demo-ruleForm">
        <el-form-item label="字典类型" prop="dictType" label-width="120px">
          <el-input v-model="editForm.dictType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典标签" prop="dictLabel" label-width="120px">
          <el-input v-model="editForm.dictLabel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典值" prop="dictValue" label-width="120px">
          <el-input v-model="editForm.dictValue" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import $lodash from "lodash"
  import * as $service from "../../api/dictionary"

  export default {
    name: "dict",
    mounted(){
      this.getListData();
    },
    data(){
      return {
        loading: false,
        dialogEditFormVisible: false,
        pagination: {},
        selectedRows:[],
        query:{
          page: 0,
          size: 10,
          dictType: null,
          dictLabel: ''
        },
        editForm: {
          dictType:'',
          dictLabel:'',
          dictValue:''
        },
        editFormRules: {
          dictType: [
            {required: true, message: '请输入字典类型', trigger: 'blur'}
          ],
          dictLabel: [
            {required: true, message: '请输入字典标签', trigger: 'blur'}
          ],
          dictValue: [
            {required: true, message: '请输入字典值', trigger: 'blur'}
          ]
        }
      }
    },
    watch:{
      'query.dictLabel': function(){
        this.getListData();
      }
    },
    methods:{

      getListData(){
        var $this = this;
        this.loading = true;
        $service.findList($this.query).then((res) => {
          $this.pagination = res.data;
          $this.loading = false;
        }).catch(() => {
          $this.loading = false;
        });
      },

      filterByType(type){
        this.query.dictType = type;
        this.getListData();
      },

      resetSearch(){
        this.query.dictType = null;
        this.getListData();
      },

      tableRowClassName({ row, rowIndex }){
        for(let i = 0; i< this.selectedRows.length; i++){
          if(row == this.selectedRows[i]){
            return "success-row";
          }
        }
        return "";
      },

      handleSelectionChange(val){
        this.selectedRows = val;
      },

      handleSizeChange(size){
        this.query.page = 0;
        this.query.size = size;
        this.getListData();
      },

      handleCurrentChange(page){
        this.query.page = page-1;
        this.getListData();
      },

      handleEdit(item){
        this.resetForm('editForm');
        if(item){
          this.editForm = this.$lodash.cloneDeep(item);
        }
        this.dialogEditFormVisible = true;
      },

      handleDelete(item){
        var $this = this;
        this.$confirm('是否删除此字典项?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $service.deleteById(item.id).then(function(){
            $this.getListData();
            $this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        })
      },

      handleDeleteSelected(){
        let $this = this;
        let ids = [];
        if(this.selectedRows.length == 0){
          this.$message({
            message: "请选择需要删除的数据",
            type: "warning"
          });
          return false;
        }
        this.selectedRows.forEach((row, index) => {
          ids.push(row.id);
        });
        this.$confirm('是否删除这些字典项?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $service.deleteByIds(ids).then(function(){
            $this.getListData();
            $this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        })
      },

      resetForm(formName) {
        if(this.$refs[formName]) {
          this.$refs[formName].clearValidate();
        }
      },

      submitForm: $lodash.debounce(function(){
        this.$refs['editForm'].validate((valid) => {
          if (!valid) return false;
          let loading = this.$loading();
          $service.save(this.editForm).then((res) => {
            this.dialogEditFormVisible = false;
            setTimeout(() => {
              loading.close();
            }, 500)
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.getListData();
          }).catch(function(){
            loading.close();
          });
        });

      }, 200)

    }

  }
</script>

<style>
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
