import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
// 引入自定义指令
import * as directives from '@/directives'
// 引入过滤器
import * as filters from '@/filters'
// 引入组件
import components from '@/components'
// 统一注册自定义指令
for (const key in directives) {
  Vue.directive(key, directives[key])
}
// 统一注册过滤器
for (const key in filters) {
  Vue.filter(key, filters[key])
}
// 统一注册组件
Vue.use(components)


// mock假数据
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// dev:devlopment开发
// test:测试
// production生产
// 关闭一些提示，在开发期间保留，打包上线以后就可以关闭了
Vue.config.productionTip = false
// 图片加载失败，就使用自定义指令，插入默认的图片
//参数1:自定义指令的名字:不需要+v-
//参数2:是配置对象

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
