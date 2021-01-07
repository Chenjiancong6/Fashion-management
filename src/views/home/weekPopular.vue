<!--本周流行-->
<template>
  <div class="weekPopular">
    <!--tool-->
    <el-row class="tool-bar">
      <el-button size="mini" type="primary" icon="el-icon-refresh" plain @click="handleRefresh">刷新</el-button>
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="handleAdd" plain>新增</el-button>
    </el-row>
    <!-- 新增弹窗 -->
    <el-row>
      <el-dialog
        :visible.sync="addDialog"
        :append-to-body="true"
        :close-on-click-modal="false"
        width="500px"
        title="本周流行款"
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
              <el-form-item prop="name" style="margin: 0;padding: 0" label="流行名称：" size="mini">
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
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="date" label="日期" sortable></el-table-column>
      <el-table-column prop="name" label="本周流行" sortable>
        <template scope="scope">
          <img :src="scope" width="60" height="60" alt="图片加载失败" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="流行名称" :formatter="formatter"></el-table-column>
      <el-table-column prop="mime_type" label="操作">
        <!-- 删除 -->
        <template slot-scope="scope">
          <el-button icon="el-icon-delete" type="danger" circle @click="handleDelete(scope.row.id)"></el-button>
        </template>
      </el-table-column>
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
export default {
  name: "weekPopular",
  data() {
    return {
      tableData: [], //表格参数
      addDialog: false,
      tottalCount: 0, //页面数据的总条数
      pageSize: 3, //每页显示多条数据
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
    //刷新
    handleRefresh() {
      location.reload(); //整个网页页面刷新
    },
    //新增
    handleAdd() {
      this.addDialog = true;
    },

    //删除
    handleDelete(Id) {},

    //弹窗确认
    handleCreate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fileParams = {
            filePath: this.createForm.photo,
            fileObj: this.fileObjs //文件对象
          };
          let metaData = { categoryName: "week_popular" }; //指定上传的文件
           //上传图片API接口
          this.$cloudApi.upload(fileParams, metaData);
          //上传图片名字API
          let tableName = 'week_popular'; //表名
          let name={name:this.createForm.name}  //上传的字段
          this.$cloudApi.uploadName(tableName,name)
          this.$refs.upload.submit();
          this.addDialog = false;
          //清空缓存
          this.createForm = {
            name: "", //图片名
            photo: "" //图片
          };
        } else {
          this.$notify.warning({ message: "上传失败" });
          return false;
        }
      });
    },

    //弹窗取消
    handleCancle() {
      this.addDialog = false;
    },

    //选取完后 上传成功/失败后触发
    imgSaveToUrl(file) {
      //图片本地预览方法
      // 获取上传的文件对象
      this.fileObjs = file.raw; //.raw是关键！
      let URL = window.URL || window.webkitURL; //本地路径
      this.createForm.photo = URL.createObjectURL(file.raw);
    },

    //分页导航条
    handlePages(page) {
      this.showPages(page);
    },

    //分页函数
    showPages() {},

    //表格
    formatter(row, column) {
      return row.address;
    }
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

</style>