/**
 *   初始化知晓云
 */
var BaaS = require('minapp-sdk')   //知晓云SDK

const clientID = "4e891f3054e50221540d"; //开发者 ID
const options = {
    // logLevel:'',
    // host:'',
    // env:''
}

BaaS.init(clientID, options)

export default BaaS