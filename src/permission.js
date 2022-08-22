import router,{asyncRoutes} from './router'
import store from './store'
// 路由全局前置守卫
// 路由全局后置守卫
// 路由独享守卫
// 组件内守卫
// 会在所有路由进入之前触发
// to:去哪里的路由信息
// from:来自于哪个路由的信息
// next:是否进入
const whiteList = ['/login', '/404']
router.beforeEach(async(to,form,next)=>{
    const token=store.state.user.token
    if(token){// 进行权限控制：
        if(!store.state.user.userInfo.userId){
            // 获取用户信息 store.dispatch的返回值是promise
            const {roles}=await store.dispatch('user/getUserInfo')
            // console.log(roles.menus);
            await store.dispatch('permission/filterRoutes',roles)
            await store.dispatch('permission/setPointsAction',roles.points)
            next(to.path)
        }

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
