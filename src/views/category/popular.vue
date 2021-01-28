/** 正在流行*/
<template>
  <div id="popular">
     <commonView :APIData="current_api"></commonView>
  </div>
</template>

<script>
import commonView from "@/components/common/commonView"
export default {
    name:'poplar',
    components:{commonView},
    data(){
        return{
         current_api:'category_popular'  //后端数据API接口名
        }
    }
}
</script>

<style scoped>

</style>