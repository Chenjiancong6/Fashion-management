/**
 * 封装知晓云Api,暴露接口
 */
import login from './login'
import carousel from "../home/carousel"
import { upload, uploadName } from "../API/uploadAPI";  //上传功能的API
import { queryImage, queryData} from "../API/queryAPI" //查询数据
export default {
    login,
    carousel,
    upload, //上传图片
    uploadName, //上传图片的名字
    queryImage,
    queryData
}