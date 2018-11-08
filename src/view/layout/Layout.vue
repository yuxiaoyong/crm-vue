<template>
  <div id="vue_root_element" style="height:100%;overflow: hidden;box-sizing: border-box;min-width:800px;" v-cloak>
    <Navibar></Navibar>

    <Header></Header>

    <!-- main start -->
    <section :class="sidebarCollapsed()?'app-main-fragment collapse':'app-main-fragment'">
      <el-scrollbar style="height:100%;">
        <div style="padding: 10px;">
          <transition name="slide-fade">
            <router-view></router-view>
          </transition>
        </div>
      </el-scrollbar>
    </section>
    <!-- main end -->
  </div>
</template>

<script>
  import Navibar from "./Navibar"
  import Header from "./Header"
  export default{
    name: "layout",
    data(){
      return {
        sidebarCollapsed(){
          return this.$store.getters.sidebarCollapsed
        },
        breadcrumb:this.$store.getters.breadcrumb
      }
    },
    methods:{
      toggleSidebar(){
        this.$store.dispatch("toggleSideBar");
      }
    },
    components:{
      Navibar,
      Header
    }

  }
</script>

<style>

</style>
