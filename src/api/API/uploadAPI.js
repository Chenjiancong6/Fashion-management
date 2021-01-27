/**
 * 封装知晓云上传图片，图片名字等常用接口方法
 */
import BaaS from "../cloud/init"
import Vue from 'vue'
import store from "@/store/index";  //引入vuex
//上传图片API函数
/**
 * 
 * @param {文件对象} fileParams 
 * @param {指定上传的文件} metaData
 * @param {存储的vuex缓存名} vuexName
 */
export function upload(fileParams, metaData,vuexName){
  return new Promise((resolve,reject)=>{
      let File = new BaaS.File();
      File.upload(fileParams, metaData).then(res=>{
        //console.log(res.data.file,"测试下拉")
        //获取的值存储在vuex 
        if (vuexName){
          store.dispatch(vuexName, res.data.file)
        }
        
          Vue.prototype.$message.success("上传成功");
          //整个网页页面刷新
        // location.reload();
      }).catch(err=>{
          Vue.prototype.$message.error("上传失败");
          return false;
      })
  })
}

/**
 * 数据表存储数据
 * @param {数据表名} tableName 
 * @param {参数，可以是对象或者字符串 } value 
 */
export function uploadName(tableName,value){
  return  new Promise(()=>{
      let Product = new BaaS.TableObject(tableName) //向指定数据表插入一条记录
      let product = Product.create()  //创造
      product.set(value).save()  //保存
    })
}

