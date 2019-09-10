import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/views/layout/layout'
import Normalontent from '@/views/layout/normalContent'
import store from '@/store/index.js'
import {getToken} from '@/utils/auth'
import {message} from 'ant-design-vue'
//vue router 报错： Uncaught (in promise) NavigationDuplicated {_name:""NavigationDuplicated"
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const LayoutRouteTemplate = {
  path: '/',
  component: Layout,
  name:'layout',
  redirect:'/HelloWorld',
  children:[
  ],
}
const i = {
    path:'/HelloWorld',
    name: 'single',
    icon:'home',
    component:() => import('@/components/HelloWorld.vue')
}

LayoutRouteTemplate.children = [i]
Vue.use(Router)
export const constantRoutes = [
  LayoutRouteTemplate,
  {
    path: '/login',
    icon: 'home',
    name: 'Login',
    hidden: true,
    component: ()=>import('@/views/login/index'),
    //component: HelloWorld,
  },{
    path: '/redirect',
    icon: 'redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component:() => import('@/views/redirect/index')
    }]
  }
]


//自动添加到layout组件，
export const asyncRoutes = [
  {
      path: '/test/index',
      icon:'lock',
      name:'test',
      component:() => import('@/components/test.vue')
  },{
    path: '/test/index1',
    redirect:'/test/index1/test',
    icon:'user',
    name:'test3',
    component:Normalontent,//有子组件必须有容器
    children:[{
      path:'/test/index1/test',
      icon:'user',
      name:'test1',
      component:() => import('@/components/test2.vue')
    },{
      path:'/test/index1/test2',
      icon:'user',
      name:'test2',
      component:() => import('@/components/test3.vue')
    }]

  }
]

let router = new Router({
  scrollBehavior: () => ({y:0}),
  routes: constantRoutes
})
const whiteList = ['/login','/404']
router.beforeEach(async(to, from, next)=> {

  NProgress.start()
  const hasToken = getToken()
  if(hasToken){
    if(to.path==='/login'){
      next({path: '/'})
      NProgress.done()
    }else{
      next()
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if(hasRoles){
        next()
      }else{
        try{
          const { roles } = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes',roles)
          console.log(accessRoutes)

          LayoutRouteTemplate.children = accessRoutes
          LayoutRouteTemplate.path = '/'+accessRoutes[0].name
          LayoutRouteTemplate.redirect = accessRoutes[0].path

          //动态添加到子组件
          router.addRoutes([LayoutRouteTemplate])

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        }catch(error){
          await store.dispatch('user/resetToken')
          console.log(error)
          message.error(error || 'has error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()

        }
      }
    }
  }else{
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


export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
