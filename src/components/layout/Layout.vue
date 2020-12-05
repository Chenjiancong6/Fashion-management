<!--页面导航栏-->
<template>
  <div class="layout">
    <el-row>
      <el-col :span="24" class="top_layout">
        <top-layout></top-layout>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="left_layout">
        <left-layout></left-layout>
      </el-col>
      <el-col :span="20">
        <right-layout class="right_layout"></right-layout>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TopLayout from "./TopLayout";
import LeftLayout from "./LeftLayout";
import RightLayout from "./RightLayout";
export default {
  name: "Layout",
  components: { TopLayout, LeftLayout, RightLayout },
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style >
.right_layout {
  margin-left: 20px;
  margin-top: 10px;
}
.left_layout {
  background-color: #f0f0f0;
  height: calc(100vh - 40px);
}
.top_layout {
  background-color: #c1b9e0;
}
</style>