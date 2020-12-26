/**
 * vuex中使用登录，技术问题暂时不用
 */

import BaaS from "@/api/cloud/init"

const state={
   nickname:'',
   avatar:''
}

const getters={
   nickname:state=>state.nickname,
   avatar:state=>state.avatar
}

const mutations={

}

const actions={
    getLogin({commit},from){
      return new Promise((resolve, reject) => {
             BaaS.auth.login(form).then(user => {
                console.log(user.avatar, 1123);

                sessionStorage.setItem("nickname", user.nickname) //登录名
                sessionStorage.setItem("avatar", user.avatar)
                Vue.prototype.$message.success("登录成功");
            }).catch(err => {
                Vue.prototype.$message.error("登录失败");
            })
        }) 
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}