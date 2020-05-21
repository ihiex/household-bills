import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout';

// import AppMain from '@/src/view'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/home/Home'

Vue.use(Router)

//使用动态方式配置路由
export const constantRouterMap = [
  // {path: '/404', component:()=>import('@/views/404'),hidden: true}
  {
    path: '/',
    component: Layout,
    name: 'default',
    redirect: '/admin/dashboard'
  },
  {
    path: '/admin',
    component: Layout,
    name: '',
    children:[{
      path: 'dashboard',
      name: 'dashboard',
      component: ()=> import('@/views/home/Home'),
      meta: {title: 'dashboard', icon:'el-icon-mes-xitongguanli-'}
    }]
  }
]


export default new Router({
  mode: 'history',
  scrollBehavior: ()=>({y:0})
  // routes: [
  //   {
  //     path: '/home',
  //     name: 'Home',
  //     component: Home
  //   },
  //   {
  //     path: '/HelloWorld',
  //     name: 'HelloWorld',
  //     component: HelloWorld
  //   },
  //   {
  //     path: '/',
  //     redirect: '/home'
  //   }
  // ],
  // mode: history
})

export const appRouterMap =[
  {
    path: '/home',
    component: Layout,
    name: 'Home',
    children: [
      { path: 'about', name: 'About', meta: { title: 'organization', icon: 'el-icon-mes-yonghuzu'/* , permission: 'Pages.Tenants' */ }, componentUrl: 'home/about/About' },
    ]
  },
]
