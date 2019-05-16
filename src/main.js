// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import $ from 'jquery'
import {common} from '@/common/common'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap-table/dist/bootstrap-table.min.css'
import 'bootstrap-table/dist/bootstrap-table.min'
import 'bootstrap-table/dist/locale/bootstrap-table-zh-CN.min'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$jquery = $
Vue.prototype.$vue = Vue
Vue.prototype.$common = common

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
