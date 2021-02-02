/**
**创建一个公共的显示页面组件 （首页之前没有进行组件封装）
 */
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
                <img v-if="createForm.path" :src="createForm.path" class="avatar" />
                <el-button
                  v-if="createForm.path"
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
      <el-table-column prop="collection" label="收藏人数"></el-table-column>
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
    <pagination :query-name="APIData" @pageData="pageData"></pagination>
  </div>
</template> 

<script>
import BaaS from "@/api/cloud/init";
import pagination from "@/components/common/pagination"; //分页
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "popular",
  components: { pagination },
  //接收父组件传递过来的数据
  props:{
      APIData:{
          type:String,
          default(){
              return ''
          }
      }
  },
  data() {
    return {
      tableData: [], //表格参数
      addDialog: false,
      fileObjs: "", //文件对象
      createForm: {
        path: "", //图片
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
       const that=this;
      // console.log(that)
      this.$refs[formName].validate(valid => {
        if (valid) {
           let fileParams = {
            filePath: this.createForm.path,
            fileObj: this.fileObjs //文件对象
          };
          let metaData = { categoryName: this.APIData }; 
          //上传图片API接口
             //输入框输入的值
          const param={
            price:this.createForm.price,
            title: this.createForm.title,
            sale: this.createForm.sale,
            collection: this.createForm.collection,
            shop: this.createForm.shop,
            totalSale: this.createForm.totalSale,
            totalShop: this.createForm.totalShop
          }

       /**
        * 1.先执行上传图片到文件表的请求
        * 2.在上传文件表后，在then()内部执行上传数据表的请求
        */
      let File = new BaaS.File();
      File.upload(fileParams, metaData).then(res=>{       
            this.$refs.upload.submit();
          param.iid=res.data.file.id;//图片的id
          param.path=res.data.file.path,  //图片的地址
          //2.写入数据表API  
          that.$cloudApi.uploadName(this.APIData,param) 
          this.$message.success("上传成功");         
      }).catch(err=>{
         this.$message.error("上传失败");
          return false;
      })
          this.addDialog = false;
          //清空缓存
          this.createForm = {
            path: "", //图片
             title: "",
             price: "",
             sale: "",
             collection: "",
             shop: "",
             totalSale: "",
             totalShop: ""
          };
        } else {
          this.$notify.warning({ message: "上传失败" });
          return false;
        }     
      });
      //  //整个网页页面刷新
      //   location.reload(); 
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
      this.createForm.path = URL.createObjectURL(file.raw);
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
      }).then(() => {
        this.$cloudApi.deleteTable(this.APIData,id)
         this.$message({
            type: "success",
            message: "删除成功!"
          });
      }).catch(() => {
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
   computed: {
    //vuex缓存数据
    ...mapGetters({})
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