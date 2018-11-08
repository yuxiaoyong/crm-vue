<template>
  <el-select :placeholder="placeholder" :value="value" :size="size" clearable  @input="handleChange($event)">
    <el-option v-for="rank in ranks" :value="rank.value" :label="rank.label"></el-option>
  </el-select>
</template>

<script>
    export default {
      name: "ElSelectRank",
      props:['value', 'size', 'max', 'showAllTip', 'showAllTipLabel', 'placeholder'],
      mounted(){
        var max = this.max? this.max: 5;
        for(let i = 1; i <= max; i++){
          this.ranks.push({value: i, label: this.getLabel(i)});
        }
      },
      data(){
        return {
          ranks:[]
        }
      },
      methods:{
        getLabel(value){
          let label = '';
          let count = 0;
          while(++count <= value){
              label += '★';
          }
          return label;
        },
        handleChange: function(val) {
          this.$emit('input', val);
          this.$emit('change', val);
        }
      }
    }
</script>

<style scoped>

</style>
