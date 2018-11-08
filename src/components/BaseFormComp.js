import $lodash from "lodash"
export default {
  mounted(){
    this.initialize();
  },
  data(){
    return {
      dialogEditFormVisible: false,
      editForm: { },
      editFormRules: { }
    }
  },
  methods:{

    getService(){
      throw new Error("getService method is not implemented");
    },

    beforeInitialize(){},

    initialize(){
      this.beforeInitialize();
      this._editForm = this.$lodash.cloneDeep(this.editForm);
      this.afterInitialize();
    },

    afterInitialize(){},

    open({ item }){
      if(this.$refs.editForm) {
        this.$refs.editForm.resetFields();
      }
      if(item instanceof MouseEvent){
        item = null;
      }
      if(item){
        this.editForm = this.$lodash.cloneDeep(item);
      }else{
        this.editForm = this.$lodash.cloneDeep(this._editForm);
      }

      this.dialogEditFormVisible = true;

      this.afterOpen({item: item});

    },

    afterOpen({ item }){
      //TODO
    },

    close(){
      this.dialogEditFormVisible = false;
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

      let loading = this.$loading({text: '数据处理中'});

      this.beforeValidate().then(() => {
        return this.validate();
      }).then(() => {
        return this.afterValidate();
      }).then(() => {
        return this.getService().save(this.editForm);
      }).then((res) => {
        this.dialogEditFormVisible = false;
        setTimeout(() => {
          loading.close();
        }, 500);
        this.$message({
          type: 'success',
          message: '操作成功!'
        });

      }).catch((err) => {
        loading.close();
      });

    }, 200),

    beforeValidate(){
      //TODO
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    },

    validate(){
      return this.$refs['editForm'].validate();
    },

    afterValidate(){
      //TODO
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    }

  }
}
