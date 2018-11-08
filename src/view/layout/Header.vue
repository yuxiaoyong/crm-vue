<template>
  <header :class="sidebarCollapsed()?'app-header-fragment collapse':'app-header-fragment'">
    <el-menu style="height:50px;padding:0px 10px;background-color:#F4F6F9;" class="el-menu-demo" mode="horizontal">

      <i @click="toggleSidebar()" style="line-height: 50px;font-size: 22px;cursor: pointer;display: inline-block;" :class="sidebarCollapsed()?'icon iconfont icon-hanbaobao hamburge-rotate':'icon iconfont icon-hanbaobao'"></i>

      <el-breadcrumb style="display: inline-block;margin-left:10px;" separator="/">
        <transition-group name="slide-fade">
          <el-breadcrumb-item :key="item.path" v-for="item in breadcrumb">{{item.name}}</el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>

      <div style="float:right;">
        <div style="height:40px;margin-top:5px;line-height: 40px;">
          <el-dropdown @command="handleCommand" style="cursor: pointer;">
                <span>
                  <img style="height:40px;vertical-align: middle;border-radius:20px;margin-right:10px;" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"/>
                  <span class="el-dropdown-link">
                    张静<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                  </span>
                </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><i class="icon iconfont icon-gerenziliao"></i> 个人资料</el-dropdown-item>
              <el-dropdown-item><i class="icon iconfont icon-xiugai-copy"></i> 修改密码</el-dropdown-item>
              <el-dropdown-item><i class="icon iconfont icon-shezhi"></i> 系统设置</el-dropdown-item>
              <el-dropdown-item><i class="icon iconfont icon-pifu"></i> 更换皮肤</el-dropdown-item>
              <el-dropdown-item command="signOut"><i class="icon iconfont icon-tuichu"></i> 退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div style="clear: both;"></div>
      </div>
    </el-menu>
    <!--<ul class="navi-tab">
        <li class="active">首页</li>
        <li>控制台 <i class="el-icon-close"></i></li>
        <li>用户设置 <i class="el-icon-close"></i></li>
        <li>公告信息 <i class="el-icon-close"></i></li>
        <li>数据统计 <i class="el-icon-close"></i></li>
    </ul>-->
  </header>
</template>
<script>
  export default{
    name: "Header",
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
      },
      handleCommand(command){
        switch(command){
          case "signOut":
            this.handleSignOut();
            break;
        }
      },
      handleSignOut(){
        this.$store.dispatch("signOut");
      }
    }

  }
</script>
<style>
  @keyframes hamburge-rotate
  {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(90deg);
    }
  }
.hamburge-rotate{
  animation: hamburge-rotate 0.5s;
  transform:rotate(90deg);
}
</style>
