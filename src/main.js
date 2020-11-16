import Vue from "vue";
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import cloudApi from './api/cloud/cloudApi' //全局挂载知晓云api

Vue.use(ElementUI);

Vue.prototype.$cloudApi = cloudApi //全局挂载

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")