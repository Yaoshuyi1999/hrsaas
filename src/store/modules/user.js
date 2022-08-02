import {getUserInfoApi, login,getUserDetail} from '@/api/user'
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
    },
    // 获取用户信息
    async getUserInfo(context){
      const userBaseInfo=await getUserInfoApi()
      const userInfo = await getUserDetail(userBaseInfo.userId)
      context.commit('setUserInfo',{...userBaseInfo,...userInfo})
    }
  }
}

