/** 男生护肤*/
<template>
  <div id="">
     <commonView :APIData="current_api"></commonView>
  </div>
</template>

<script>
import commonView from "@/components/common/commonView"
export default {
    name:'skin',
    components:{commonView},
    data(){
        return{
         current_api:'category_skin'  //后端数据API接口名
        }
    }
}
</script>

<style scoped>

</style>
</style>