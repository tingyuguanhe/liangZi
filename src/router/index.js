import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const layout = () => import('@/views/layout/app_main')
const index = () => import('@/views/index')
const account = () => import('@/views/account/index')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      children:[
        {
          path: '',
          name: 'index',
          component: index,
        },
        {
          path: '/account',
          name: 'account',
          component: account
        }
      ]
    }
  ]
})
