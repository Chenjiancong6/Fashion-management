/**
 * 首页的状态管理 vuex
 */
const state = {
    Image: '',  //本周流行图片
    ImgText: '', //本周流行图片名字
}

const getters = {
    Image: state => state.Image,
    ImgText: state => state.ImgText
}

const mutations = {
    //获取图片
    GET_IMAGE: (state, Image) => {
        Object.assign(state, { Image })
    },
    //获取图片名字
    GET_IMAGE_TEXT: (state, ImgText) => {
        Object.assign(state, { ImgText })
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}