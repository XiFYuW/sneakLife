import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App'
import router from './router'
import axios from 'axios'
import $ from 'jquery'

import './css/system.css'

/**
 * bootstrap
 */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

/**
 * bootstrap-table
 */
import 'bootstrap-table/dist/bootstrap-table.min.css'
import 'bootstrap-table/dist/bootstrap-table.min'
import 'bootstrap-table/dist/locale/bootstrap-table-zh-CN.min'

/**
 * treegrid
 */
import 'jquery-treegrid/css/jquery.treegrid.css'
import 'jquery-treegrid/js/jquery.treegrid.min'
import 'jquery-treegrid/js/bootstrap-table-treegrid'

/**
 * treeview
 */
import 'patternfly-bootstrap-treeview/dist/bootstrap-treeview.min.css'
import 'patternfly-bootstrap-treeview/dist/bootstrap-treeview.min'

/**
 * select
 */
import 'bootstrap-select/dist/css/bootstrap-select.min.css'
import 'bootstrap-select/dist/js/bootstrap-select.min'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN.min'

/**
 * datetimepicker
 */
import 'bootstrap-datetimepicker/src/css/bootstrap-datetimepicker.min.css'
import 'bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.min'
import 'bootstrap-datetimepicker/src/js/locales/bootstrap-datetimepicker.zh-CN'

/**
 * 消息提示
 */
import 'toastr/build/toastr.css'
import toastr from 'toastr/build/toastr.min'

/**
 * bootstrap-fileinput
 */
import 'bootstrap-fileinput/css/fileinput.css'
import 'bootstrap-fileinput/js/fileinput.js'
import 'bootstrap-fileinput/js/locales/zh.js'
import 'bootstrap-fileinput/themes/fa/theme.js'

/**
 * 共有属性
 */
import {utils, operaClick, deepCopy} from './common/common'
import {central} from './common/keyless/central'
import {modalFrame} from './common/modalFrame'
import {myToastr} from './common/toastr'
import {selects} from './common/selects'
import {treeView} from './common/treeview'
import {fileInput} from './common/fileInput'

const v = new Vue()
myToastr.init(toastr)

/**
 * 设置jquery与axios异步
 */
axios.defaults.withCredentials = true
$.ajaxSetup({
  crossDomain: true,
  xhrFields: {
    withCredentials: true
  }
})

axios.interceptors.request.use((config) => {
  config.date = {startTime: new Date()}
  v.$emit('isRespLoad', true)
  return config
}, function (err) {
  return Promise.reject(err)
}
)

axios.interceptors.response.use((response) => {
  response.config.date.endTime = new Date()
  response.duration = response.config.date.endTime - response.config.date.startTime
  if (response.duration > 200) {
    v.$emit('isRespLoad', false)
  } else {
    setTimeout(function () {
      v.$emit('isRespLoad', false)
    }, 200)
  }
  return response
}, function (err) {
  const { config, code, message } = err
  if (code === 'ECONNABORTED') {
    myToastr.error('请求超时！')
    v.$emit('isRespLoad', false)
  }
  if (message === 'Network Error') {
    myToastr.error('请求错误，服务拒绝响应！')
    v.$emit('isRespLoad', false)
  }
  return Promise.reject(err)
})

central.setToastr(myToastr)
central.setVue(v)
central.setCookie(VueCookies)

utils.setToastr(myToastr)
utils.setModalFrame(modalFrame)
utils.setCentral(central)
utils.setHttp(axios)
utils.setVue(Vue)
utils.setSelects(selects)
utils.setSelectsTree(treeView)
utils.setOperaClick(operaClick)
utils.setDeepCopy(deepCopy)
utils.setFileInput(fileInput)

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$jquery = $
Vue.prototype.$utils = utils
Vue.prototype.$central = central
// window.onbeforeunload = function () {
//   debugger
//   let n = window.screenX - window.screenLeft
//   let b = n > document.documentElement.scrollWidth - 20
//   if (b || window.screenY <= 0) {
//     VueCookies.remove('sk')
//     VueCookies.remove('to')
//   }
// }
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
