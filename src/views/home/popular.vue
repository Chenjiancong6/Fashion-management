<!--首页流行栏-->
<template>
  <div id="popular">
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
        title="流行"
      >
        <el-form ref="createForm" :model="createForm" label-position="top">
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
              <el-form-item prop="title" style="margin: 0;padding: 0" label="商品描述：" size="mini">
                <el-input type="textarea" autosize v-model="createForm.title" />
              </el-form-item>
              <el-form-item prop="price" style="margin: 0;padding: 0" label="商品价格：" size="mini">
                <el-input v-model="createForm.price" />
              </el-form-item>
              <el-form-item prop="sale" style="margin: 0;padding: 0" label="商品销量：" size="mini">
                <el-input v-model="createForm.sale" />
              </el-form-item>
              <el-form-item
                prop="collection"
                style="margin: 0;padding: 0"
                label="收藏人数："
                size="mini"
              >
                <el-input v-model="createForm.collection" />
              </el-form-item>
              <el-form-item prop="shop" style="margin: 0;padding: 0" label="店铺名称：" size="mini">
                <el-input v-model="createForm.shop" />
              </el-form-item>
              <el-form-item prop="totalSale" style="margin: 0;padding: 0" label="总销量：" size="mini">
                <el-input v-model="createForm.totalSale" />
              </el-form-item>
              <el-form-item
                prop="totalShop"
                style="margin: 0;padding: 0"
                label="店铺总商品量："
                size="mini"
              >
                <el-input v-model="createForm.totalShop" />
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
      <el-table-column label="日期" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span
            style="margin-left: 10px"
          >{{ new Date((scope.row.created_at)*1000).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column label="流行" sortable>
        <template scope="scope">
          <img :src="scope.row.path" width="60" height="60" alt="图片加载失败" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="商品描述"></el-table-column>
      <el-table-column prop="shop" label="店铺名称"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="sale" label="商品销量"></el-table-column>
      <el-table-column prop="collect" label="收藏人数"></el-table-column>
      <el-table-column prop="totalSale" label="总销量"></el-table-column>
      <el-table-column prop="totalShop" label="店铺总商品量"></el-table-column>
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
    <!--封装的分页组件-->
    <pagination :query-name="queryNAME" @pageData="pageData"></pagination>
  </div>
</template> 

<script>
import BaaS from "@/api/cloud/init";
import pagination from "@/components/common/pagination"; //分页
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "popular",
  components: { pagination },
  data() {
    return {
      queryNAME: "week_popular", //数据库要查询的文件名
      tableData: [], //表格参数
      addDialog: false,
      fileObjs: "", //文件对象
      createForm: {
        photo: "", //图片
        title: "",
        price: "",
        sale: "",
        collection: "",
        shop: "",
        totalSale: "",
        totalShop: ""
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
    //弹窗确认
    handleCreate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           let fileParams = {
            filePath: this.createForm.photo,
            fileObj: this.fileObjs //文件对象
          };
          let metaData = { categoryName: "home_popular" }; 
          //上传图片API接口
          this.$cloudApi.upload(fileParams, metaData);
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

    /**
     * 分页--从封装的组件传递过来的数据
     */
    pageData(data) {
      this.tableData = data;
    },

    //删除
    handleDelete(id) {
      this.$confirm("确定要删除此图片吗？", "删除图片", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {}).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //表格
    formatter(row, column) {
      return row.address;
    }
  },
  created() {}
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
</style>