<template>
  <div class="layout-header">
      <div>
        <i :class="{'el-icon-s-fold':isCollapse,
                    'el-icon-s-unfold':!isCollapse}"></i>
       <!-- <span>潮流街APP后台管理系统</span> -->
       </div>
      <div class="layout-right">   
        <el-popover
          placement="bottom-start"
          title="标题"
          width="200"
          trigger="hover"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        >
          <el-button slot="reference" icon="el-icon-user">个人中心</el-button>
        </el-popover>  
      <span>
        欢迎：
        <span>{{nickname}}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
   name:'LayoutHeader',
    props:{
   isCollapse:{
     type:Boolean
   }
 },
 data(){
   return{
     nickname:''
   }
 },
 
 methods:{
    ...mapActions({
      getNickName:'header/getNickName'
    }),
      
 },
 computed:{
   ...mapGetters({
      nickname:'header/nickname'
   })
 },
 created(){
    //获取用户登录昵称
      let win = window.sessionStorage;
    this.nickname = win.getItem("nickname")
     
 }
}
</script>

<style>
.layout-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>