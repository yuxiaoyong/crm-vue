<template>
  <div class="login-bg">
    <div style="flex: 1;"></div>
    <div style="height:300px;">
      <div class="login-box">
        <div class="login-header">港鑫客户管理系统</div>
        <div class="login-body">
          <ul style="list-style: none;width:100%;margin:0px;padding:0px;">
            <li>
              <i class="icon iconfont icon-user"></i>
              <input type="text" v-model="username" class="login-username login-input" placeholder="用户名"/>
            </li>
            <li>
              <i class="icon iconfont icon-password"></i>
              <input type="password" v-model="password" class="login-password login-input" placeholder="密码"/>
            </li>
            <li>
              <input type="button" value="登录" @click="handleLogin()" class="login-button login-input" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div style="flex: 2;"></div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data(){
      return{
        username: '',
        password:''
      }
    },
    mounted(){
      document.querySelectorAll(".login-input").forEach(function(item){
        item.addEventListener("focus", function(){
          document.querySelectorAll(".login-input").forEach(function(obj){
            obj.parentNode.className = "";
          });
          this.parentNode.className = "active"
        });
      })
    },
    methods:{
      handleLogin(){
        if(this.username == ''){
          this.$message({
            message: '用户名不能为空',
            type: 'error'
          });
          return false;
        }
        if(this.password == ''){
          this.$message({
            message: '密码不能为空',
            type: 'error'
          });
          return false;
        }
        this.$store.dispatch("signIn", {
          username: this.username,
          password: this.password
        }).then((res) => {
          console.log("login success");
          this.$router.push({ path: "/customer" });
        })
      }
    }
  }
</script>

<style scoped>
  .login-bg{
    height:100%;
    width:100%;
    background-image: url("../../assets/img/login_bg.jpg");
    background-size: cover;
    display: flex;
    flex-direction: column;
  }
  .login-box{
    height: 100%;
    width:400px;
    background-color:rgba(255,255,255, 0.7);
    box-shadow: 0px 0px 15px #999999;
    margin: auto;
    border-radius: 5px;
  }
  .login-header{
    padding: 30px;
    text-align: center;
    font-size: 18px;
    color:#00A3FF;
  }

  .login-body li{
    width: 80%;
    display: block;
    margin: auto;
    position: relative;
  }

  .login-body .login-input{
    border-radius: 6px;
    box-shadow: none;
    outline: none;
    padding: 0;
    width:100%;
    line-height: 45px;
    display: block;
    height: 45px;
    font-size:16px;
    border: 1px solid #cbccce;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

  .login-body .login-input:focus{
    border: 1px solid #66afe9;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
  }

  .login-body .login-username{
    margin-bottom:10px;
    background:none;
    text-indent: 50px;
  }

  .iconfont{
    position: absolute;
    font-size:24px !important;
    top: 10px;
    left: 10px;
    color:#999999;
  }

  .login-body li.active .iconfont{
    color:#66afe9;
  }

  .login-body .login-password{
    margin-bottom:20px;
    background:none;
    text-indent: 50px;
  }
  .login-body .login-button{
    background-color: #00A3FF;
    color:#FFFFFF;
    cursor: pointer;
  }
  .login-body .login-button:hover{
    background-color: #337ab7;
    color:#FFFFFF;
  }

</style>
