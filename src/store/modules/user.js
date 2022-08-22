import {getUserInfoApi, login,getUserDetail} from '@/api/user'
import { resetRouter } from '@/router'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token:'',
    userInfo:{}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
  },
  actions: {
    // 登录请求获取token
    async getToken(context,payload){
      // 发送请求得来的
      const res=await login(payload)
      // console.log(res);
      context.commit('setToken', res)
      setTokenTime()
    },
    // 获取用户信息
    async getUserInfo(context){
      const userBaseInfo=await getUserInfoApi()
      const userInfo = await getUserDetail(userBaseInfo.userId)
      context.commit('setUserInfo',{...userBaseInfo,...userInfo})
      // 在这里通过userBaseInfo处理动态路由
      // actians 内部可以通过return将数据传递出去,类then中的return
      return userBaseInfo
    },
    // 退出
    logout(context){
      context.commit('setToken',''),
      context.commit('setUserInfo',{})
      resetRouter()
      // (root: true) context 相当于全局的context
      context.commit('permission/setRoutes',[],{root:true})
    }
  }
}

