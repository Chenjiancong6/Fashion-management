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
const popular = () => import("@/views/home/popular")  //首页流行栏
const news = () => import("@/views/home/news")  //首页新款栏
const sell = () => import("@/views/home/sell")  //首页精选栏

//以下是分类页下的10个路由
const category_popular =()  =>import("@/views/category/popular")
const category_superMarket = () => import("@/views/category/superMarket")
const category_manWear = () => import("@/views/category/manWear")
const category_digital = () => import("@/views/category/digital")
const category_phone = () => import("@/views/category/phone")
const category_shoes = () => import("@/views/category/shoes")
const category_model = () => import("@/views/category/model")
const category_books = () => import("@/views/category/books")
const category_sports = () => import("@/views/category/books")
const category_skin = () => import("@/views/category/skin")


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
                path: "/popular",  //首页流行栏
                name: 'popular',
                component: popular,
                meta: {
                    title: '流行',
                    auth: true
                },
            },
            {
                path: "/news",  //首页新款栏
                name: 'news',
                component: news,
                meta: {
                    title: '新款',
                    auth: true
                },
            },
            {
                path: "/sell",  //首页精选栏
                name: 'sell',
                component: sell,
                meta: {
                    title: '精选',
                    auth: true
                },
            },

            //以下10个路由是分类页下的路由
            {
                path: "/category_popular",  
                name: 'category_popular',
                component: category_popular,
                meta: {
                    title: '正在流行',
                    auth: true
                },
            },
            {
                path: "/category_superMarket",
                name: 'category_superMarket',
                component: category_superMarket,
                meta: {
                    title: '哈克超市',
                    auth: true
                },
            },
            {
                path: "/category_manWear",
                name: 'category_manWear',
                component: category_manWear,
                meta: {
                    title: '男装',
                    auth: true
                },
            },
            {
                path: "/category_digital",
                name: 'category_digital',
                component: category_digital,
                meta: {
                    title: '数码',
                    auth: true
                },
            },
            {
                path: "/category_shoes",
                name: 'category_shoes',
                component: category_shoes,
                meta: {
                    title: '潮鞋',
                    auth: true
                },
            },
            {
                path: "/category_model",
                name: 'category_model',
                component: category_model,
                meta: {
                    title: '手办模型',
                    auth: true
                },
            },
            {
                path: "/category_books",
                name: 'category_books',
                component: category_books,
                meta: {
                    title: '图书文娱',
                    auth: true
                },
            },
            {
                path: "/category_sports",
                name: 'category_sports',
                component: category_sports,
                meta: {
                    title: '运动户外',
                    auth: true
                },
            },
            {
                path: "/category_phone",
                name: 'category_phone',
                component: category_phone,
                meta: {
                    title: '手机',
                    auth: true
                },
            },
            {
                path: "/category_skin",
                name: 'category_skin',
                component: category_skin,
                meta: {
                    title: '美妆护肤',
                    auth: true
                },
            },
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