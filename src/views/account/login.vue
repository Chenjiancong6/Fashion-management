<template>
  <div class="login-container">
    <div class="login_title">潮流街APP后台管理系统</div>
    <div class="login_content">
      <div class="login_left">
        <div class="empty">
          <img src="../../assets/login.jpg" alt="" srcset="">
        </div>
      </div>
      <!--登录  -->
      <div class="login_right">
        <div class="login-box">
          <el-form
            :rules="loginFormRules"
            ref="loginForm"
            :model="loginForm"
            label-position="right"
            label-width="auto"
            show-message
          >
            <span class="login-title">欢迎登录</span>
            <div style="margin-top: 50px"></div>
            <el-form-item label="用户名" prop="username">
              <el-col :span="42">
                <el-input type="text" v-model="loginForm.username"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-col :span="42">
                <el-input type="password" v-model="loginForm.password"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loginSubmit('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      loginFormRules: {
        username: [
          { required: true, message: "账号不可为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不可为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    loginSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) { 
          //api接口   
          this.$cloudApi.login({
            username:this.loginForm.username,
            password:this.loginForm.password
            })
              //获取账号和密码放在本地缓存
           sessionStorage.setItem('username',this.loginForm.username)
           sessionStorage.setItem('password',this.loginForm.password)
         setTimeout(()=>{this.$router.replace("/index");},4000)
        
         
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
.login-container {
  width: 70%;
  height: 70%;
  position: absolute;
  left: 10%;
  top: 10%;
}
.login_title {
  margin-bottom: 70px;
   font-size: 40px;
 text-shadow: 5px 5px 5px black;
  color: white;
}
.login_content {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
.login_left {
  width: 60%;
  height: 70%;
}
.login_right {
  width: 40%;
  height: 70%;
 
}
.empty{
   display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  border: 1px solid #f5f6f8;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px rgb(163, 246, 163);
}
.empty img{
   width: 100%;
  height: 100%;
}
.login-box {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  border: 1px solid #f5f6f8;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px rgb(163, 246, 163);
}
.login-title {
  text-align: center;
  margin-left: 90px;
  text-shadow: 5px 5px 5px rgb(209, 196, 196);
  color: #66cd00;
  font-size: 30px;
  font-weight: bold;
}
</style>
