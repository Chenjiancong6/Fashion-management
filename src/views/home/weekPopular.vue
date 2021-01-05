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
              <el-form-item prop="name" style="margin: 0;padding: 0" label="输入框" size="mini">
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
  </div>
</template>

<script>
export default {
  name: "weekPopular",
  data() {
    return {
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
            message: "输入框不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
   methods:{
       //刷新
  handleRefresh() {
    location.reload(); //整个网页页面刷新
  },
  //新增
  handleAdd() {
    this.addDialog = true;
  },
   
   //弹窗确认
  handleCreate(){},

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
  } 
   }
};
</script>

<style  scoped>
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