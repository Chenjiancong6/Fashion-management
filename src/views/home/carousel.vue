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
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="path" label="图片">
          <template scope="scope">
            <img :src="scope.row.path" width="60" height="60" alt="图片加载失败" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="图片名称"></el-table-column>
        <el-table-column prop="mime_type" label="图片类型"></el-table-column>
      </el-table>
    </el-row>
    <el-row style="float:right; margin-top:20px">
      <el-pagination
        @current-change="handlePages"
        background
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="tottalCount"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import BaaS from "@/api/cloud/init";
export default {
  name: "carousel",
  data() {
    return {
      tableData: [],
      tottalCount:0, //页面数据的总条数
      pageSize:2,  //每页显示多条数据
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

    handlePages(page) {
      this.showPages(page)   
    },

    handleAdd() {
      let MyFile = new BaaS.File();

      // 查找所有文件
      MyFile.find();

      let query = new BaaS.Query();
      // 查询某一文件分类下的所有文件
      query.compare("category_name", "=", "home_carousel");
      // 查询文件名包含指定字符串的文件

      MyFile.setQuery(query).find();

      MyFile.limit(10)
        .offset(5)
        .find()
        .then();
      console.log(MyFile.setQuery(query).find(), 11);
    },

    showPages(page=0){
      let MyFile = new BaaS.File();
      let query = new BaaS.Query();
      //查询某一文件分类下的所有文件
      query.compare("category_name", "=", "home_carousel");
      //分页查询
      MyFile.setQuery(query).limit(this.pageSize).offset(page).find().then(res => {
      this.tableData = res.data.objects;        
      });
      
      //查询文件的总条数
       MyFile.setQuery(query).count().then(num => {
       this.tottalCount=num;
      //console.log(this.tottalCount,221); 
     })

      
      }

  },
  created(){
    // let MyFileCategory = new BaaS.FileCategory();
    // //获取轮播文件分类的所有图片资源
    // MyFileCategory.getFileList("5fd9f79f8692dc2c35484970").then(res => {
    //   this.tableData = res.data.objects;
    //   // console.log(this.tableData, 5555);
    // });
      this.showPages()
      
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