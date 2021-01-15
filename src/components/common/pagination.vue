<!--底部分页组件-->
<template>
  <div id="pagination">
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
 name:'pagination',
 props:{
     //从父组件传递过来的 文件分类下的所有文件
     queryName:{
         type:String,
         default(){
             return ""
         }
     }
 },
 data(){
     return{
     tottalCount: 0, //页面数据的总条数
      pageSize:5 , //每页显示多条数据
     }
 },
 methods:{
      //分页导航条
    handlePages(page) {
      this.showPages(page);     
    },

    //分页函数
    showPages(page = 0) {  
      //查询某一文件表分类下的所有文件
      //let MyFile = new BaaS.File();
      //let query = new BaaS.Query();
     // query.compare("category_name", "=", this.queryName);
       
       //查询数据表下具体表的所有数据
    let query = new BaaS.Query()
    let Product = new BaaS.TableObject(this.queryName)
      //分页查询
      Product.setQuery(query)
        .limit(this.pageSize)
        .offset(page)
        .find()
        .then(res => {
            //子组件向父组件传递数据
         this.$emit("pageData",res.data.objects)
        });

      //查询数据表的总条数
      Product.setQuery(query)
        .count()
        .then(num => {
          this.tottalCount = num;
        });
    },
 },
 created(){
      this.showPages();
 }
}
</script>

<style scoped>

</style>