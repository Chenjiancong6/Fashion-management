//查询所有注册用户信息

import BaaS from "./init"

export function queryUser(){
    let MyUser = new BaaS.User()
    // 查找所有用户
    MyUser.find().then(res=>{
        console.log(res,"查找所有用户");
        
    })
}