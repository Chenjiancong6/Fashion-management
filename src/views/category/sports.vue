/**运动户外 */
<template>
  <div>
    <commonView :APIData="current_api"></commonView>
  </div>
</template>

<script>
import commonView from "@/components/common/commonView";
export default {
  name: "soprts",
  components: { commonView },
  data() {
    return {
      current_api: "category_sports" //后端数据API接口名
    };
  }
};
</script>

<style scoped>
</style>