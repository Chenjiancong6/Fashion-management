import BaaS from "./init"
import Vue from 'vue'
import store from "@/store/index";  //引入vuex

/**
 * @param {phone:"",password:""}   //登录参数
 */

function login(form) {
    return new Promise((resolve, reject) => {
        BaaS.auth.login(form).then(user => {
            store.commit("setNickName", user.nickname)//登录名
            store.commit("setAvatar", user.avatar)//登录头像
            store.commit('setUser', user._username)  //把获取的token登录凭证放到vuex中存储
            Vue.prototype.$message.success("登录成功");
        }).catch(err => {
            Vue.prototype.$message.error("登录失败");
        })
    })
}

export default login