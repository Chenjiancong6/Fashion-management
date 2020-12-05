<template>
  <div class="top-layout">
    <div class="layout-left">
      <span>潮流街APP后台管理系统</span>
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
        <span>超级大哈克</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopLayout",
  components: {},
  data() {
    return {
      //visible: true
    };
  }
};
</script>

<style scoped>
.top-layout {
  /* display: flex; */
  margin-right: 25px;
}
.layout-left {
  float: left;
  margin-left: 15px;
  margin-top: 8px;
}
.layout-right {
  float: right;
  margin:0 10px
}
</style>