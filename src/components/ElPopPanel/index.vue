<template>
  <div ref="elPopPanel" :style="'width:'+ width" class="el-pop-panel">
    <el-scrollbar style="height:100%;">
      <div style="width:100%;height: 100%;padding:10px;box-sizing: border-box;position: relative;">
        <slot></slot>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>

    export default {
      name: "ElPopPanel",
      props:['width'],
      mounted(){
        document.getElementById('vue_root_element').addEventListener('click', this.hideIfNecessary);
      },
      beforeDestroy(){
        document.getElementById('vue_root_element').removeEventListener('click', this.hideIfNecessary)
      },
      methods:{
        show(){
          this.$refs.elPopPanel.className = "el-pop-panel animated slideInRight";
          this.$refs.elPopPanel.style.display = 'block';
        },

        hideIfNecessary(event){
          var node = event.target;
          while(node){
            if(this.$refs.elPopPanel == node){
              return;
            }
            node = node.parentNode;
          }
          this.hide();
        },

        hide(){
          var $this = this;
          this.$refs.elPopPanel.className = "el-pop-panel animated slideOutRight";
          setTimeout(function(){
            if($this.$refs.elPopPanel) {
              $this.$refs.elPopPanel.style.display = 'none';
            }
          }, 500)
          setTimeout(function(){
            $this.$emit('close');
          }, 50);

        }

      }
    }
</script>

<style scoped>
  .el-pop-panel{
    position: fixed;
    background-color: #FFFFFF;
    height: calc(100% - 50px);
    top:50px;
    right: 0px;
    width:300px;
    box-sizing: border-box;
    box-shadow: -3px 0px 3px #DDDDDD;
    z-index: 2000;
    animation-duration: 0.5s;
    display: none;
  }
</style>
