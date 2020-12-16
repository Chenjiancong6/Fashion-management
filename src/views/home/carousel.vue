<!--轮播图数据-->
<template>
  <div class="table">
    <!--tool-->
    <el-row class="tool-bar">
      <el-button size="mini" type="primary" icon="el-icon-refresh" plain @click="handleRefresh">刷新</el-button>
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="handleAdd" plain>新增</el-button>
      <el-button size="mini" type="primary" icon="el-icon-edit" plain>修改</el-button>
      <el-button size="mini" type="primary" icon="el-icon-close" plain>删除</el-button>
    </el-row>
    <!-- 表格 -->
    <el-row style="margin-top:10px">
      <el-table :data="tableData"  style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="path" label="图片">
          <img width="50" :src="tableData[2].path" height="50" />
        </el-table-column>
        <el-table-column prop="name" label="图片名称" width="180"></el-table-column>
        <el-table-column prop="mime_type" label="图片类型"></el-table-column>
      </el-table>
    </el-row>
    <el-row style="float:right;margin-top:20px">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-row>
  </div>
</template>

<script>
import BaaS from "@/api/cloud/init";
export default {
  name: "carousel",
  data() {
    return {
      tableData:[]
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleRefresh() {},
    handleAdd() {
    
    }
  },
  created() {
     let MyFileCategory = new BaaS.FileCategory();
      MyFileCategory.getFileList("5fd9f79f8692dc2c35484970").then(res => {      
          this.tableData=res.data.objects
           console.log(this.tableData, 5555);
        },
        err => {
          // err
        }
      );
  }
};
</script>

<style>
.tool-bar {
  padding: 0 0 20px 0;
  border-bottom: 1px solid rgb(195, 190, 190);
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>