import { fetch } from '@/api/index'
import $ from 'jquery'

//login
export const userRegister = (reqData) => fetch('POST','/api/register/',{data:reqData})
//获取手机验证码
export const getSmsCode = (reqData) => fetch('POST','/api/notice/',{data: reqData})
//login
export const userLogin = (reqData) => fetch('POST','/api/login/',{data: reqData})
//图片验证码
export const getCaptcha = () => fetch('GET','/api/captcha/')  
//判断是否登录，个人信息
export const checkLogin = () => fetch('GET','/api/auth_info/')

//充值--产品列表
export const getProducts = () => fetch('GET','/api/pay/')
//价格
export const buy = (reqData) => fetch('POST','/api/pay/',{data: reqData})
//退出
export const loginOut = () => fetch('GET','/api/logout/')