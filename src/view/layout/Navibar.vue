<template>
  <nav :class="sidebarCollapsed()?'left-navi-menu collapse':'left-navi-menu'">
    <el-scrollbar style="height:100%;">
      <el-menu
        :collapse="sidebarCollapsed()"
        style="height:100%"
        :default-active="activeIndex"
        text-color="#fff"
        class="el-menu-vertical-demo"
        @select="handleMenuSelect"
        router>
        <template v-for="menu in menus">

          <el-menu-item v-if="!menu.children && menu.display" :index="menu.path">
            <i :class="menu.className"></i><template slot="title"><span>{{menu.name}}</span></template>
          </el-menu-item>
          <el-submenu v-if="menu.children && menu.display" :index="menu.path">
            <template slot="title"><i :class="menu.className"></i><span>{{menu.name}}</span></template>
            <template v-for="secmenu in menu.children">
              <el-menu-item v-if="!secmenu.children && secmenu.display" :index="secmenu.path"><i :class="secmenu.className"></i>{{secmenu.name}}</el-menu-item>
              <el-submenu v-if="secmenu.children && secmenu.display" :index="secmenu.path">
                <template slot="title"><i :class="secmenu.className"></i>{{secmenu.name}}</template>
                <template v-for="thrmenu in secmenu.children">
                  <el-menu-item v-if="thrmenu.display" :index="thrmenu.path"><i :class="thrmenu.className"></i>{{thrmenu.name}}</el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-submenu>

        </template>
      </el-menu>
    </el-scrollbar>
  </nav>
</template>
<script>
export default{
  name: "Navibar",
  data(){
    return {
      sidebarCollapsed(){
        return this.$store.getters.sidebarCollapsed
      },
      activeIndex: this.$route.path,
      menus:[{
        name: "工作台",
        className: "el-icon-menu",
        path: "/",
        display: true
      },{
        name: "我的客户",
        className: "el-icon-menu",
        path: "/mycustomer",
        display: true,
        children:[{
          name: "客户管理",
          className: "el-icon-menu",
          path: "/customer",
          display: true
        },{
          name: "联系人管理",
          className: "el-icon-menu",
          path: "/contact",
          display: true
        }]
      },{
        name: "产品管理",
        className: "el-icon-menu",
        path: "/product",
        display: true
      },{
        name: "订单管理",
        className: "el-icon-menu",
        path: "/order",
        display: true
      },{
        name: "进货管理",
        className: "el-icon-menu",
        path: "/mypurchase",
        display: true,
        children:[{
          name: "供货合同",
          className: "el-icon-menu",
          path: "/purchase",
          display: true
        },{
          name: "供货单位",
          className: "el-icon-menu",
          path: "/supplier",
          display: true
        }]
      },{
        name: "库存管理",
        className: "el-icon-menu",
        path: "/stock",
        display: false
      },{
        name: "数据统计",
        className: "el-icon-setting",
        path: "/statistic",
        display: false
      },{
        name: "字典管理",
        className: "el-icon-menu",
        path: "/dict",
        display: true
      },{
        name: "菜单管理",
        className: "el-icon-menu",
        path: "/menu",
        display: false
      }]
    }
  },
  mounted(){
    this.activeIndex = this.$route.matched[1].path;
    this.doRoute();
  },
  beforeUpdate:function(){
    this.activeIndex = this.$route.matched[1].path;
  },
  watch:{
    $route(){
      this.doRoute();
    }
  },
  methods:{

    doRoute(){
      var $this = this;
      this.menus.forEach(function(menu){
        $this.wrapData(menu);
      });

      var currentMenu = this.getMenuByPath(this.menus, this.$route.matched[1].path);
      var breadcrumb = [];

      while(true){
        if(!currentMenu){
          break;
        }
        breadcrumb.push(currentMenu);
        currentMenu = currentMenu.parent;
      }
      this.$store.dispatch('setBreadCrumb', breadcrumb.reverse());
    },

    wrapData(menu){
      var $this = this;
      if(!menu.children) return;
      menu.children.forEach(function(submenu){
        submenu.parent = menu;
        $this.wrapData(submenu)
      });
    },

    getMenuByPath(menus, path){
      var $this = this;
      for(var i=0; i< menus.length; i++){
        if(menus[i].children && menus[i].children.length > 0){
          var result = $this.getMenuByPath(menus[i].children, path);
          if(!result)continue;
          return result;
        }else if(menus[i].path == path){
          return menus[i];
        }
      }
      return null;
    },

    handleMenuSelect(key, keyPath){

    }
  }
}
</script>
<style>

</style>
