<!--购物车数量-->
<template>
  <div id="showCart">
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
          <span
            style="margin-left: 10px"
          >{{ new Date((scope.row.created_at)*1000).toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" sortable>
        <template scope="scope">
          <img :src="scope.row.path" width="60" height="60" alt="图片加载失败" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="商品描述"></el-table-column>
      <el-table-column prop="shop" label="店铺名称"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="selectedNum" label="购物车商品数量"></el-table-column>
      <el-table-column prop="userId" label="用户Id号"></el-table-column>
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
  name: "showCart",
  components: { pagination },
  data() {
    return {
      queryNAME: "shop_cart", //数据库要查询的文件名
      tableData: [], //表格参数
      fileObjs: "", //文件对象
      createForm: {
       path: "", //图片
       title: "",
       price: "",
       shop: "",
       userId:'',
       selectedNum:''
      }
    };
  },
  methods: {
   
    //刷新
    handleRefresh() {
      location.reload(); //整个网页页面刷新
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
        this.$cloudApi.deleteTable("shop_cart",id)
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
  created() {
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
</style>