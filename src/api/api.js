import { fetch } from '@/api/index'
import $ from 'jquery'

//login
export const userRegister = (reqData) => fetch('POST','/api/register/',{data:reqData})