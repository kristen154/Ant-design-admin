import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import router from './router.js'
import axios from 'axios'
import store from './store/index.js'

Vue.prototype.$axios = axios


Vue.config.productionTip = false
Vue.use(Antd)
new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
