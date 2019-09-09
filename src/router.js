import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/views/layout/layout'
import HelloWorld from '@/components/HelloWorld.vue'
import store from '@/store'
import {getToken} from '@/utils/auth'
//vue router 报错： Uncaught (in promise) NavigationDuplicated {_name:""NavigationDuplicated"
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router)
export const asnyRouter = [
  {
    path: '/',
    icon: 'home',
    name: 'Hellow',
    component: Layout,
    redirect:'/HelloWorld',
    children:[{
      path:'/HelloWorld',
      name: 'single',
      component:() => import('@/components/HelloWorld.vue')
    }]
  },{
    path: '/login',
    icon: 'home',
    name: 'Login',
    hidden: true,
    component: ()=>import('@/views/login/index'),
    //component: HelloWorld,
  },{
    path: '/redirect',
    icon: 'redirect',
    name: '重定向',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component:() => import('@/views/redirect/index')
    }]
  }
]

let router = new Router({
  scrollBehavior: () => ({y:0}),
  routes: asnyRouter
})
const whiteList = ['/login','/404']
router.beforeEach((to, from, next)=> {

  NProgress.start()
  const hasToken = getToken()
  if(hasToken){
    console.log('ddd')
    if(to.path==='/login'){
      next({path: '/'})
      NProgress.done()
    }else{
      next()
    }
  }else{
    console.log('hhdddddd')
    if (whiteList.indexOf(to.path) !== -1) { //如果在白名单里直接进入
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
  }
);


router.afterEach(()=>{
  NProgress.done()
})

export default router
