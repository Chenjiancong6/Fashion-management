<!--轮播图数据-->
<template>
  <div class="table">
    <!--tool-->
    <el-row class="tool-bar">
      <el-button size="mini" type="primary" icon="el-icon-refresh" plain @click="handleRefresh">刷新</el-button>
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="handleAdd" plain>新增</el-button>
    </el-row>
    <!-- 表格 -->
    <el-row style="margin-top:10px">
      <el-table
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        :stripe="true"
        size="mini"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="path" label="图片">
          <template scope="scope">
            <img :src="scope.row.path" width="60" height="60" alt="图片加载失败" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="图片名称"></el-table-column>
        <el-table-column prop="mime_type" label="图片类型"></el-table-column>
        <el-table-column prop="mime_type" label="操作">
          <!-- 删除 -->
          <template slot-scope="scope">
            <el-button
              icon="el-icon-delete"
              type="danger"
              circle
              @click="handleDelete(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 新增弹窗 -->
    <el-row>
      <el-dialog
        :visible.sync="addDialog"
        :append-to-body="true"
        :close-on-click-modal="false"
        width="500px"
        title="新增轮播图"
      >
        <el-form ref="createForm" :rules="rules" :model="createForm" label-position="top">
          <el-row>
            <el-col :span="12">
              <el-upload
                ref="upload"
                class="avatar-uploader"
                action="https://4e891f3054e50221540d.myminapp.com/hserve/v2.1/upload/"               
                :on-change="imgSaveToUrl"
                :show-file-list="false" 
                :auto-upload="false"            
              >
                <img v-if="createForm.photo" :src="createForm.photo" class="avatar" />
                <el-button
                  v-if="createForm.photo"
                  class="x-full"
                  size="mini"
                  type="primary"
                  plain
                >修改</el-button>
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="name" style="margin: 0;padding: 0" label="图片名字" size="mini">
                <el-input v-model="createForm.name" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancle('createForm')">取 消</el-button>
          <el-button type="primary" @click="handleCreate('createForm')">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
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
export default {
  name: "carousel",
  data() {
    return {
      tableData: [],
      tottalCount: 0, //页面数据的总条数
      pageSize: 3, //每页显示多条数据
      addDialog: false,
      fileObjs: "", //文件对象
      createForm: {
        name: "", //图片名
        photo: "" //图片
      },
      //表单验证
      rules: {
        name: [
          {
            required: true,
            message: "图片名字不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1||rowIndex === 2||rowIndex === 3) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
     
     //刷新
    handleRefresh() {
     //this.showPages(); 
     location.reload();  //整个网页页面刷新  
    },

    //删除
    handleDelete(id) {
       this.$confirm('确定要删除此文件吗？', '删除文件', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //删除api
       let MyFile = new BaaS.File();
        MyFile.delete(id).then();  
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
           //整个网页页面刷新
          location.reload(); 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },

    //弹窗取消
    handleCancle() {
      this.addDialog = false;
    },


    //弹窗确认
    handleCreate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //文件上传API
          new Promise((resolve, reject) => {
          //   let file =  {
          //   status: 'ready',
          //   name: this.fileObjs.name,
          //   size: this.fileObjs.size,
          //   percentage: 0,          
          //   uid: this.fileObjs.uid,
          //   raw: this.fileObjs
          //  };
  
            let fileParams = {
              filePath: this.createForm.photo,
              fileObj: this.fileObjs //文件对象 
            };                  
            console.log(fileParams);
            let metaData = { categoryName: "home_carousel" };  //指定上传的文件
            let File = new BaaS.File();
            //知晓云图片上传api
            File.upload(fileParams, metaData).then(res => {
            this.$notify({
            message: "上传成功",
            type: 'success',
            position: "top-right"
             });

            //手动上传，submit()方法
            this.$refs.upload.submit();

            //整个网页页面刷新
            location.reload();  
            }).catch(err=>{
            this.$notify.warning({
            message: "上传失败",
            position: "top-right"
          });        
            })
            this.addDialog = false;
            //清空缓存
            this.createForm = {
              name: "", //图片名
              photo: "" //图片
            };
            resolve();          
          });
        } else {
          this.$notify.warning({
            message: "上传失败",
            position: "top-right"
          });
          return false;
        }
      });
    },

    //选取完后 上传成功/失败后触发
    imgSaveToUrl(file) {
      //图片本地预览方法
       // 获取上传的文件对象
        this.fileObjs = file.raw;  //.raw是关键！
      let URL = window.URL || window.webkitURL;  //本地路径  
      this.createForm.photo = URL.createObjectURL(file.raw);
    },
    
    //页面导航数
    handlePages(page) {
      this.showPages(page);
    },

    //新增
    handleAdd() {
      this.addDialog = true;
    },

    //分页函数
    showPages(page = 0) {
      let MyFile = new BaaS.File();
      let query = new BaaS.Query();
      //查询某一文件分类下的所有文件
        
      //分页查询
      MyFile.setQuery(query)
        .limit(this.pageSize)
        .offset(page)
        .find()
        .then(res => {
          this.tableData = res.data.objects;
          //console.log(this.tableData, "图片");
        });

      //查询文件的总条数
      MyFile.setQuery(query)
        .count()
        .then(num => {
          this.tottalCount = num;
          console.log(this.tottalCount,"图片总数");
        });
    }
  },
  created() {
    this.showPages();
  }
};
</script>

<style scoped>
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
</style>