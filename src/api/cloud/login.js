import BaaS from "./init"
import Vue from 'vue'


/**
 * @param {phone:"",password:""}   //登录参数
 */

function login(form) {
    return new Promise((resolve, reject) => {
        BaaS.auth.login(form).then(user => {
            sessionStorage.setItem("nickname", user.nickname) //登录名
            Vue.prototype.$message.success("登录成功");
        }).catch(err => {
            Vue.prototype.$message.error("登录失败");
        })
    })
}

export default login