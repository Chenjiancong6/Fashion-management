import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const home = () =>
    import ("@/views/home/Home");
const login = () =>
    import ("@/views/account/login");
const routes = [{
        path: "/",
        redirect: "/home",
    },
    {
        path: "/home",
        name: "home",
        component: home,
        meta:{
            title:'首页',
            auth:true
        }
    },
    {
        path: "/login",
        name: "Login",
        component: login,
        meta: {
            title: "登录",
        }
    }
]

const router = new VueRouter({
    // mode: "hash", //hash：当 URL 改变时，页面不会重新加载
    // base: process.env.BASE_URL,
     routes,
})

//to跳转的页面
//from跳转前的页面
//next要跳转的页面
router.beforeEach((to, from, next) => {
    const auth = to.meta && to.meta.auth //将要跳转的页面
    if (auth) {      
        let win = window.sessionStorage
        if (win.getItem("username") == 'admin' && win.getItem("password") == '123456') {           
            next();
        } else {
            Vue.prototype.$message.success("-请先登录-")
            next({ path: "/login"})
        }
    }else{
        next()
    }
})

// 修改路由push方法,阻止重复点击报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
}

// 修改路由replace方法,阻止重复点击报错
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch((err) => err);
}

export default router