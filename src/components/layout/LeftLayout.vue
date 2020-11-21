<template>
  <div class="LeftLayout">
<el-row class="tac">
  <el-col :span="12">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
           <el-menu-item index="1-3">选项3</el-menu-item>
           <el-menu-item index="1-4">选项1</el-menu-item>
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
  </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
   name:'LeftLayout',
     methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style>

</style>