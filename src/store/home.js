/**
 * 首页的状态管理 vuex
 */
const state = {
    Image: '',  //本周流行图片
    ImgText: '', //本周流行图片名字
    popularImg:'', //流行图片
}

const getters = {
    Image: state => state.Image,
    ImgText: state => state.ImgText,
    popularImg:state=>state.popularImg
}

const mutations = {
    //获取图片
    GET_IMAGE: (state, Image) => {
        Object.assign(state, { Image })
    },
    //获取图片名字
    GET_IMAGE_TEXT: (state, ImgText) => {
        Object.assign(state, { ImgText })
    },
    //获取流行栏图片
    GET_POPULAR_IMG:(state,popularImg)=>{
        Object.assign(state,{popularImg})
    }
}

const actions = {
    //获取图片
    getImage({ commit }, data) {
        commit("GET_IMAGE", data)
    },
    //获取图片名字
    getImageText({ commit }, data) {
        commit('GET_IMAGE_TEXT', data)
    },
   //获取流行栏图片
   getPopularImg({commit},data){
       commit("GET_POPULAR_IMG",data)
   }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}