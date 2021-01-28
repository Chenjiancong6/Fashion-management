/** 潮鞋*/
<template>
  <div id="">
     <commonView :APIData="current_api"></commonView>
  </div>
</template>

<script>
import commonView from "@/components/common/commonView"
export default {
    name:'shoes',
    components:{commonView},
    data(){
        return{
         current_api:'category_shoes'  //后端数据API接口名
        }
    }
}
</script>

<style scoped>

</style>