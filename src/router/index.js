import Vue from "vue";
import VueRouter from "vue-router";
import { setItem, getItem } from "@/components/storage" //封装缓存的方法
Vue.use(VueRouter);

const home = () => import("@/views/home/Home");
const Default =()=>import("@/views/default/default")
const detail =()=>import("@/views/detail/Detail")
const login = () => import("@/views/account/login");
const LayoutIndex = () => import("@/components/layout/")  //总页面导航

const carousel =()=>import("@/views/home/carousel");  //轮播图
const weekPopular = () => import("@/views/home/weekPopular");//本周流行
const popular = () => import("@/views/home/popular")  //首页流行

const routes = [
    {
        path: '/',  
        redirect: '/index',  //登录后默认进入页面
        name: 'LayoutIndex',
        component: LayoutIndex,
        meta: {
            title: '',
            auth: true
        },
        //嵌套路由
        children: [
            {
                path: "/index",
                name: "Default",
                component: Default,
                meta: {
                    title: '默认',
                    auth: true
                },
            },
            {
                path: "/home",
                name: "home",
                component: home,
                meta: {
                    title: '首页',
                    auth: true
                },
            },
            {
                path: "/detail",
                name: "detail",
                component: detail,
                meta: {
                    title: '详情页',
                    auth: true
                },
            },
            {
                path:"/carousel",  //轮播图
                name:'carousel',
                component:carousel,
                meta: {
                    title: '轮播图',
                    auth: true
                },
            },
            {
                path: "/weekPopular",  //本周流行
                name: 'weekPopular',
                component: weekPopular,
                meta: {
                    title: '本周流行',
                    auth: true
                },
            },
            {
                path: "/popular",  //首页流行
                name: 'popular',
                component: popular,
                meta: {
                    title: '流行',
                    auth: true
                },
            }
        ]
    },

    {
        path: "/login",
        name: "Login",
        component: login,
        meta: {
            title: "登录",
        }
    },

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
         //先判断是否有登录缓存
        if (getItem("user_management")) {
           // next({ path: "/index" });  //不起作用？
           next()
        } else {
            Vue.prototype.$message.success("-请先登录-")
            next({ path: "/login" })
        }
    } else {
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