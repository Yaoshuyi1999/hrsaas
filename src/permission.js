import router from './router'
import store from './store'
// 路由全局前置守卫
// 会在所有路由进入之前触发
// to:去哪里的路由信息
// from:来自于哪个路由的信息
// next:是否进入
// 调用了next进入该路由,如果没有调用则无法进入
const whiteList = ['/login', '/404']
router.beforeEach((to,form,next)=>{
    const token=store.state.user.token
    // 进行权限控制：
    if(token){
    // 1.登录
        // 是否进入登录页
        if(to.path==='/login'){
            //1.1跳到首页
            next('/')
        }else{
            //1.2不是直接进入
            next()
        }
    }else{
    //2.未登录
    const isCludes=whiteList.includes(to.path)
        //访问的是否在白名单(未登录也能访问的页面)
        if(isCludes){
            // 2.1在白名单放行
            next()
        }else{
            // 2.2不在白名单(不登录不能访问) 跳到登录页
            next('/login')
        }
    }
  })



// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'
