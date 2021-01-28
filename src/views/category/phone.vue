/** 手机*/
<template>
  <div id="">
     <commonView :APIData="current_api"></commonView>
  </div>
</template>

<script>
import commonView from "@/components/common/commonView"
export default {
    name:'phone',
    components:{commonView},
    data(){
        return{
         current_api:'category_phone'  //后端数据API接口名
        }
    }
}
</script>

<style scoped>

</style>