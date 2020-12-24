const state={
   nickname:''
}

const getters={
   nickname:state=>state.nickname
}

const mutations={
    SET_NICK_NAME: (state, nickname) => {
       // let win = window.sessionStorage;
        //let nickname = win.getItem("nickname")
       Object.assign(state,{ nickname })
    }
}

const actions={
    getNickName({ commit }, nickname) {
        commit("SET_NICK_NAME", nickname)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};