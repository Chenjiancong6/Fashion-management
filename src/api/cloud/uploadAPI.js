/**
 * 封装知晓云上传图片，图片名字等常用接口方法
 */
import BaaS from "./init"
import Vue from 'vue'

//上传图片API函数
export function upload(fileParams, metaData){
  return new Promise((resolve,reject)=>{
      let File = new BaaS.File();
      File.upload(fileParams, metaData).then(res=>{
          Vue.prototype.$message.success("上传成功");
          //整个网页页面刷新
          location.reload();
      }).catch(err=>{
          Vue.prototype.$message.error("上传失败");
          return false;
      })
  })
}

//上传图片的名字API
export function uploadName(tableName,value){
  return  new Promise(()=>{
      let Product = new BaaS.TableObject(tableName) //向指定数据表插入一条记录
      let product = Product.create()  //创造
      product.set(value).save()  //保存
    })
}

