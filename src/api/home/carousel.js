//首页轮播图接口
import BaaS from "../cloud/init"

function carousel(from){
     let MyFile = new BaaS.File()
        MyFile.get('5f93d2fc172ddb1dc6f96500').then(res=>{
          console.log(res.data.path,"文件");
           table(res.data.path)
        })
}

export default carousel

