<template> 
<el-container class="layout-container">
   <el-aside width="auto">
    <app-aside :is-collapse="isCollapse" class="app-aside"></app-aside>
    </el-aside>
  <el-container>
    <el-header>
      <app-header :is-collapse="isCollapse"  @click.native="isCollapse=!isCollapse"></app-header>
    </el-header>
    <el-main>
      <!-- 嵌套路由 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import AppAside from "./aside";  //左边侧边栏
import AppHeader from "./header"; //顶部
export default {
   name:'LayoutIndex',
   components:{ AppAside, AppHeader },
   data(){
     return{
      isCollapse:false
     }
   }
}
</script>

<style scoped>
.layout-container{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.app-aside{
  height: 100%;
}
.el-header {
    background-color: rgb(234, 238, 243);
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  
  /* .el-main {
    text-align: center;
    line-height: 160px;
  } */
</style>