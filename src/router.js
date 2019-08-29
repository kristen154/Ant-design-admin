import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/views/layout/layout'


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
    component: Layout,
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

router.beforeEach((to, from, next)=>{
  NProgress.start()
  next()
});


router.afterEach(()=>{
  NProgress.done()
})

export default router
