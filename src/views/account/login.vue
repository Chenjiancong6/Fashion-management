<template>
  <div id="login_content">
    <div id="login">
      <div class="heard">
        <img src="@/assets/img/logo.png" alt />
        <span class="heard_title">Pleace-Login</span>
      </div>
      <div class="title">
        <span>潮流街APP后台管理系统</span>
      </div>
      <div id="froms">
        <div class="froms_input">
          <el-input
            prefix-icon="el-icon-s-custom"
            placeholder="请输入账号"
            v-model="loginForm.username"
            clearable
          ></el-input>
        </div>
        <div class="froms_password">
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            v-model="loginForm.password"
            show-password
          ></el-input>
        </div>
        <div class="froms_login">
          <el-button type="success" @click="clickLogin" size="medium">登入</el-button>
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
        username: "",
        password: ""
      }
    };
  },
  methods: {
    //登录
    clickLogin() {
      this.$cloudApi.login({
        username: this.loginForm.username,
        password: this.loginForm.password
      });
      setTimeout(() => {
        this.$router.replace("/index");
      }, 2000);
    }
  }
};
</script>

<style scoped>
#login_content {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(233, 233, 233);
  background: url("../../assets/img/background2.svg"),url("../../assets/img/background.svg");
}

#froms {
  margin-top: 20px;
}
.froms_input {
  margin-top: 20px;
}
.froms_password {
  margin-top: 20px;
}
.froms_login {
  margin-top: 20px;
}
.el-button {
  width: 100%;
}
.heard {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
.heard .heard_title {
  margin-left: 10px;
  color: #67c23a;
  font-size: 24px;
}
.heard img {
  height: 50px;
  width: 50px;
}
.title {
  margin-left: 25px;
  margin-top: 20px;
  color: rgb(136, 133, 133);
}
</style>