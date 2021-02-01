<template>
  <el-menu
      router
      :collapse="isCollapse"
      default-active="1"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#409EFF"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
    <!--  -->
     <el-submenu index="/index">
        <template slot="title">
          <i class="el-icon-s-platform"></i>
          <span index="/index">欢迎页</span>
        </template>
         </el-submenu>
    <!--  -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>首页</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/carousel">轮播图</el-menu-item>
          <el-menu-item index="/weekPopular">本周流行</el-menu-item>
           <el-menu-item index="/popular">流行栏</el-menu-item>
           <el-menu-item index="/news">新款栏</el-menu-item>
             <el-menu-item index="/sell">精选栏</el-menu-item>
           </el-menu-item-group>
      </el-submenu>
     <!--  -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-promotion"></i>
          <span>分类页</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/category_popular">正在流行</el-menu-item>
          <el-menu-item index="/category_superMarket">哈克超市</el-menu-item>
           <el-menu-item index="/category_manWear">男装</el-menu-item>
           <el-menu-item index="/category_digital">数码</el-menu-item>
           <el-menu-item index="/category_phone">手机</el-menu-item>
           <el-menu-item index="/category_shoes">潮鞋</el-menu-item>
           <el-menu-item index="/category_model">手办模型</el-menu-item>
           <el-menu-item index="/category_books">图书文娱</el-menu-item>
           <el-menu-item index="/category_sports">运动户外</el-menu-item>
           <el-menu-item index="/category_skin">男生护肤</el-menu-item>
           </el-menu-item-group>
      </el-submenu>
      <!--  -->
       <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-shopping-cart-2"></i>
          <span>购物车</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/showCart">商品数量</el-menu-item>
           </el-menu-item-group>
      </el-submenu>
      <!--  -->
       <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-loading"></i>
          <span>个人中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/showUser">注册用户</el-menu-item>
           </el-menu-item-group>
      </el-submenu>
    </el-menu>

</template>

<script>
export default {
 name:'AppAside',
 data(){
   return{
    // isCollapse:false
   }
 },
   methods: {
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      }
    },
 props:{
   isCollapse:{
     type:Boolean
   }
 }
}
</script>

<style>
.el-submenu{
  width: 150px;
}
</style>