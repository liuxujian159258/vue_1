import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
/* 导入全局样式表 */
import './assets/css/global.css'
/* 导入axios */
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 导入NProgress对应的JS和CSS
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// 导入lib-flexible
// import 'lib-flexible/flexible'
// 引入qs
import qs from 'qs'
// 配置根路径
axios.defaults.baseURL = 'http://121.36.32.198:8090/'
// 在request拦截器中展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  // console.log(config)
  NProgress.start()
  // 必须在最后 return config
  config.headers.token = window.sessionStorage.getItem('token')
  return config
})
// 在response拦截器中，隐藏进度条NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios
Vue.prototype.qs = qs
Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)
// 将富文本编辑器，注册为全局可以的组件
Vue.use(VueQuillEditor)
// 全局时间过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDay() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
