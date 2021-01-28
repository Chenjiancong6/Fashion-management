/** 手办模型*/
<template>
  <div id="">
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
         current_api:'category_model'  //后端数据API接口名
        }
    }
}
</script>

<style scoped>

</style>
</style>