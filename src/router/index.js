import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const home = () => import("@/views/home/Home");
const login = () => import("@/views/account/login");
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: home,
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
  routes,
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
