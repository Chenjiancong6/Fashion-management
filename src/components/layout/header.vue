<template>
  <div class="layout-header">
      <div>
        <i :class="{'el-icon-s-fold':isCollapse,
        'el-icon-s-unfold':!isCollapse}">
        </i>
        <!-- <span>潮流街APP后台管理系统</span>  -->
       </div>
        <div>
          <el-dropdown>
            <div style=" display: flex;align-items: center;">
              <img 
              style=" height:40px;width:40px;border-radius: 50%;margin-right: 10px;" 
              :src="avatar" alt="">
              <span>{{nickname}}</span>
              <i style="margin-left:20px" class="el-icon-loading  el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item>设置</el-dropdown-item>
             <div @click="clickLogout">
              <el-dropdown-item >退出</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { setItem, getItem,removeItem } from "@/components/storage" //封装缓存的方法
export default {
   name:'LayoutHeader',
    props:{
   isCollapse:{
     type:Boolean
   }
 },
 data(){
   return{
     nickname:'',
     avatar:""
   }
 },
 
 methods:{
    ...mapActions({
      getNickName:'header/getNickName'
    }),
    clickLogout(){
      removeItem("user_management")
       removeItem("nickname_management")
      removeItem("avatar_management")
      this.$router.push({path:'/login'})
    }
      
 },
 computed:{
  //  ...mapGetters({
  //     nickname:'header/nickname'
  //  })
 },
 created(){
    //获取用户登录昵称和头像
      this.nickname = getItem("nickname_management")
      this.avatar = getItem("avatar_management")  
 }
}
</script>

<style>
.layout-header{
  height: 60px;
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
}
.avata-warp{
  display: flex;
  align-items: center;
}

</style>