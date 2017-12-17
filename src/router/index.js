import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import store from '@/store'
import {checkLogin} from '@/api/api'
import { Message } from 'element-ui'
Vue.use(Router)

const layout = () => import('@/views/layout/app_main')
const index = () => import('@/views/index')
const login = () => import('@/views/login/login')

const account = () => import('@/views/account/index')

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      children:[
        {
          path: '/',
          name: 'index',
          component: index,
          text:'首页',
          meta:{
            title:'量子加速器'
          }
        },
        {
          path: '/account',
          name: 'account',
          component: account,
          text:'个人中心',
          meta:{
            title:'个人中心'
          }
        },
        {
          path: '/login',
          name: 'login',
          component: login,
          text:'登录／注册',
          meta:{
            title:'登录／注册'
          }
        },
        
      ]
    }
  ]
})


router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  //console.log(to.path);
  checkLogin().then(
    (resData) => {
      if(resData.status == 'ok'){
        store.dispatch('get_user_info');
        sessionStorage.setItem('username', resData.data.username);
        next();
      }else{
        if(to.path != '/login' && to.path != '/'){
          Message({
            showClose: true,
            message: '请先登录',
            type: 'error'
          })
          next();
          next('/login');
        }else{
          next();
        }
        
      }
      
    }
  )
  
})
export default router
