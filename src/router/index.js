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
const recharge = () => import('@/views/recharge/index')


const router = new Router({
  mode:'history',
  scrollBehavior(to,from,savedPosition){
      if(savedPosition){
          return savedPosition;
      }else{
          return {x: 0,y: 0}
      }
  },
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
          path: '/recharge',
          name: 'recharge',
          component: recharge,
          text:'充值',
          meta:{
            title:'充值',
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/account',
          name: 'account',
          component: account,
          text:'个人中心',
          meta:{
            title:'个人中心',
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
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
        }   
      ]
    }
  ]
})


router.beforeEach((to, from, next) => {
  
  console.log(to.path);
  //需要登录
  if(!!to.meta.requireAuth) {
    document.title = to.meta.title;
    // 这个路由需要auth,检验是否登录了.
    checkLogin().then(
    (resData) => {
      //已登录
      sessionStorage.removeItem('username'); 
      if(resData.status == 'ok'){  
        sessionStorage.setItem('username', resData.data.username);
        next();
      }else{  //未登录    
        if(to.path == '/account' || to.path == '/recharge'){

        window.location.href='/login';
        Message({
          showClose: true,
          message: '请先登录',
          type: 'error'
        })  
        }else{
          next();
        }   
      }    
    }
  )
   
  }else{
    next();
  }

  
  
})
export default router
