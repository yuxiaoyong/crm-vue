import $lodash from "lodash"
export default {
  mounted(){
    this.initialize();
  },
  data(){
    return {
      loading: false,
      pagination: {},
      selectedRows:[],
      defaultSort: 'order,asc',
      query:{
        page: 0,
        size: 10,
        sort: 'order,asc'
      }
    }
  },
  methods:{

    getService(){
      throw new Error("getService method is not implemented");
    },

    initialize(){
      this.getListData();
    },

    getListData: $lodash.debounce(function(){
      this.loading = true;
      this.getService().findList(this.query).then((res) => {
        this.pagination = res.data;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    }, 200),

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

    handleSortChange({ column, prop, order }){
      if(prop && order){
        this.query.sort = prop + "," + order.replace("ending", "");
      }else{
        this.query.sort = this.defaultSort;
      }

      this.getListData();
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
      throw new Error("handleEdit method is not implemented");
    },

    handleEditFormClose(){
      this.getListData();
    },

    handleDelete(item){
      this.$confirm('是否删除此条目?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.getService().deleteById(item.id).then(() => {
          this.getListData();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      })
    },

    handleDeleteSelected(){
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
      this.$confirm('是否删除这些条目?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.getService().deleteByIds(ids).then(() => {
          this.getListData();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      })
    }



  }
}
