/**
 * 封装知晓云 查询显示 常用接口方法
 */
import BaaS from "../cloud/init"
import Vue from 'vue'
import store from "@/store/index";  //引入vuex

export function queryImage(queryName){
    let MyFile = new BaaS.File();
    let query = new BaaS.Query();
    //查询某一文件分类下的所有文件
    query.compare("category_name", "=", queryName);
    MyFile.setQuery(query).find().then(res => {
       // console.log(res.data.objects)
        //获取的值存储在vuex
        store.dispatch("home/getImage", res.data.objects)
    })
}

//查询知晓云数据API
export function queryData(tableName) {
    //return new Promise(() => {
        // 实例化查询对象
        let query = new BaaS.Query()
        let Product = new BaaS.TableObject(tableName)
        Product.setQuery(query).find().then(res => {
           // console.log(res,999)
            store.dispatch("home/getImageText", res.data.objects)
        })
   // })
}