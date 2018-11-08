<template>
  <el-select :placeholder="placeholder" :value="value" :size="size" clearable  @input="handleChange($event)">
    <el-option v-for="dict in dicts" :value="dict.dictValue" :label="dict.dictLabel"></el-option>
  </el-select>
</template>

<script>
    import * as dictionary from "../../api/dictionary"

    export default {
      name: "ElSelectDict",
      props:['value', 'size', 'showAllTip', 'showAllTipLabel', 'placeholder', 'dictType'],
      data(){
        return {
          dicts:[]
        }
      },
      mounted(){
        let $this = this;
        dictionary.findList({
          dictType: this.dictType,
          page: 0,
          size: 100
        }).then(function(res){
          $this.dicts = res.data.content;
        })
      },
      methods:{
        handleChange: function(val) {
          this.$emit('input', val);
          this.$emit('change', val);
        }
      }
    }
</script>

<style scoped>

</style>
