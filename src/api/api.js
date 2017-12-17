import { fetch } from '@/api/index'
import $ from 'jquery'

//login
export const userRegister = (reqData) => fetch('POST','/api/register/',{data:reqData})
//获取手机验证码
export const getSmsCode = (param) => fetch('GET',`/api/notice/?phone=${param.phone_num}`)
//login
export const userLogin = (reqData) => fetch('POST','/api/login/',{data:reqData})

//判断是否登录，个人信息
export const checkLogin = () => fetch('GET','/api/auth_info/')


//退出
export const loginOut = () => fetch('GET','/api/logout/')