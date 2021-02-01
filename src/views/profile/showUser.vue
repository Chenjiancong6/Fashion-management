<!--本周流行-->
<template>
  <div class="showUser">
    <!--tool-->
    <el-row class="tool-bar">
      <el-button size="mini" type="primary" icon="el-icon-refresh" plain @click="handleRefresh">刷新</el-button>
    </el-row>
   
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column label="日期" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ new Date((scope.row.created_at)*1000).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户头像" >
        <template scope="scope">
          <img :src="scope.row.avatar" width="60" height="60" alt="图片加载失败" />
        </template>
      </el-table-column>
      <el-table-column prop="_username" label="用户名"></el-table-column>
      <el-table-column prop="nickname" label="用户昵称"></el-table-column>
      <el-table-column prop="id" label="用户Id"></el-table-column>

    </el-table>
    <!-- 分页 -->
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
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "showUser",
  data() {
    return {
      tableData: [], //表格参数
      tottalCount: 0, //页面数据的总条数
      pageSize: 100, //每页显示多条数据 
    };
  },
  computed: {
    //vuex缓存数据
    ...mapGetters({
      Image: "home/Image", //图片
      ImgText: "home/ImgText" //图片描述
    })
  },

  methods: {

    //刷新
    handleRefresh() {
      location.reload(); //整个网页页面刷新
    },
    

    //分页导航条
    handlePages(page) {
      this.showPages(page);
      console.log(page,"分页");
      
    },

    //分页函数 
    //!!!!分页函数有bug,暂不能实现分页功能
    showPages(page = 0) { 
    let query = new BaaS.Query();
    let MyUser = new BaaS.User()
     MyUser.limit(this.pageSize).offset(page).find().then(res=>{
         this.tableData = res.data.objects
        // console.log(res.data.objects[1]._username,1111);    
     })
        //查询文件的总条数
      MyUser.setQuery(query).count().then(num => {
          this.tottalCount = num;
          //console.log(num,222);    
        });
    },

    
  },
  created() {
    this.showPages();
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>>

