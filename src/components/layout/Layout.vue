<!--页面导航栏-->
<template>
  <div class="layout">
<el-row>
  <el-col :span="24"><top-layout ></top-layout></el-col>
</el-row>
<el-row>
  <el-col :span="5"><left-layout></left-layout></el-col>
  <el-col :span="19" class="right_layout"><right-layout></right-layout></el-col>
</el-row>
  </div>
</template>

<script>
 import TopLayout from "./TopLayout"
 import LeftLayout from "./LeftLayout"
 import RightLayout from "./RightLayout"
export default {
   name:"Layout",
   components:{TopLayout,LeftLayout,RightLayout},
   data() {
       return {
           
       }
   },
   methods:{},
   computed:{}
}
</script>

<style >
.right_layout{
  float: left;
}
 
</style>