import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import { setItem, getItem } from "@/components/storage" 

const USER_KEY = "user_management"  //登录凭证
const NICKNAME_KEY = "nickname_management"  //登录昵称
const AVATAR_KEY = "avatar_management"  //登录头像

import header from "./header"
import login from "./login"
import home from "./home"
export default new Vuex.Store({
  state:{
    user: getItem(USER_KEY),  //登录token
    nickname: getItem(NICKNAME_KEY),  //登录昵称
    avatar: getItem(AVATAR_KEY)//登录头像
  },
  getters:{
   
  },
  mutations: {
    //全局获取登录的token
    setUser(state, data) {
      state.user = data;
      //为防止数据丢失，做本地存储
      setItem(USER_KEY, state.user)
    },
    //获取昵称
    setNickName(state, data) {
      state.nickname = data
      setItem(NICKNAME_KEY, state.nickname)
    },
    //获取登录头像
    setAvatar(state, data) {
      state.avatar = data
      setItem(AVATAR_KEY, state.avatar)
    }
  },
  actions: {
   
  },
  namespaced: true,
  modules: {
    header,
    login,
    home
  },
})
