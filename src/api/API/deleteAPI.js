/**
 * 封装删除文件/数据的接口
 */
import BaaS from "../cloud/init"
import Vue from 'vue'
import store from "@/store/index";  //引入vuex

//删除文件表API
export function deleteImg(Id){
    //删除文件的图片
    let MyFile = new BaaS.File();
    MyFile.delete(Id);
    Vue.prototype.$message.success("删除成功！");
    //整个网页页面刷新
    location.reload();
}

//删除数据表API
/** 
 * @param { 数据表名 } tableName 
 * @param { 选中的当前行数据Id号 } recordID 
 */
export function deleteTable(tableName, recordID){
    let Product = new BaaS.TableObject(tableName);
    Product.delete(recordID).then(res => {
        Vue.prototype.$message.success("删除成功！");
        //整个网页页面刷新
        location.reload();
    }, err => {
      Vue.prototype.$message.error("删除失败！");
    })
}