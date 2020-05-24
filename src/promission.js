import router from './router'
// import { Message } from 'element-ui'
import axios from 'axios'
const _import = require('./router/_import_' + process.env.NODE_ENV) //获取组件的方法
import Layout from '@/views/layout' //Layout 是架构组件，不在后台返回，在文件里单独引入
import routers from '@/router/fake_router' //加载本地路由

var getRouter //用来获取后台拿到的路由

// 假装fakeRouter是通过后台接口请求回来的数据
/* let fakeRouter = {
  "router": [{
    "path": "",
    "component": "Layout",
    "redirect": "dashboard",
    "children": [{
      "path": "dashboard",
      "component": "dashboard/index",
      "meta": {
        "title": "首页",
        "icon": "dashboard"
      }
    }]
  },
  {
    "path": "/example", //当有多级时一级可设为虚拟路径
    "component": "Layout",
    "redirect": "/example/home",
    "name": "Example",
    "meta": {
      "title": "案例",
      "icon": "example"
    },
    "children": [{
      "path": "index",
      "name": "home",
      "component": "home/Home",
      "meta": {
        "title": "家",
        "icon": "home"
      }
    },
    {
      "path": "about",
      "name": "about",
      "component": "home/about/About",
      "meta": {
        "title": "关于",
        "icon": "about",
      },
      // hidden: true
    }
    ]
  },
  {
    "path": "*",
    "redirect": "/404",
    "hidden": true
  }
  ]
} */
router.beforeEach((to, from, next) => {
  /* console.log(getRouter)
  if (!getRouter) { //不加这个判断，路由会陷入死循环
    if (!getObjArr('router')) {
      // 加载服务器上的路由 由后台控制
      // axios.get('https://www.easy-mock.com/mock/5a5da330d9b48c260cb42ca8/example/antrouter').then(res => {
      console.log('beforeEach  getRouter')
      getRouter = fakeRouter.router //假装模拟后台请求得到的路由数据
      saveObjArr('router', getRouter) //存储路由到localStorage

      routerGo(to, next) //执行路由跳转方法
      // })
    } else { //从localStorage拿到了路由
      getRouter = getObjArr('router') //拿到路由
      console.log(getRouter)
      routerGo(to, next)
    }
  } else {
    next()
  } */

  //改成前端控制路由
  if (!getRouter) {

    getRouter = routers.routers;
    
    routerGo(to, next)

  } else {
    next()
  }
})


function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter) //过滤路由
  router.addRoutes(getRouter) //动态添加路由
  global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to, replace: true })
}

function saveObjArr(name, data) { //localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) { //localStorage 获取数组对象的方法
  return JSON.parse(window.localStorage.getItem(name));

}

function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
  let accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') { //Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })


  return accessedRouters
}
