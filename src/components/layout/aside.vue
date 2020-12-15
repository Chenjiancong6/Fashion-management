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
     <el-submenu index="/">
        <template slot="title">
          <i class="el-icon-s-platform"></i>
          <span>首页</span>
        </template>
         </el-submenu>
    <!--  -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>详情页</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/detail">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
           <el-menu-item index="1-3">选项3</el-menu-item>
           <el-menu-item index="1-4">选项4</el-menu-item>
           </el-menu-item-group>
      </el-submenu>
     <!--  -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>导航二</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
           <el-menu-item index="1-3">选项3</el-menu-item>
           <el-menu-item index="1-4">选项1</el-menu-item>
           </el-menu-item-group>
      </el-submenu>
      <!--  -->
       <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>导航三</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
           <el-menu-item index="1-3">选项3</el-menu-item>
           <el-menu-item index="1-4">选项1</el-menu-item>
           </el-menu-item-group>
      </el-submenu>
      <!--  -->
       <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>导航四</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
           <el-menu-item index="1-3">选项3</el-menu-item>
           <el-menu-item index="1-4">选项1</el-menu-item>
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
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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