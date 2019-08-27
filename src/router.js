import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/views/layout/layout'
import HelloWorld from '@/components/HelloWorld.vue'
Vue.use(Router)
export const asnyRouter = [
  {
    path: '/',
    icon: 'home',
    name: 'Login',
    component: HelloWorld,
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
