import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const AsyncView = require('../common/common').AsyncView
export default new Router({
  routes: [
    {
      path: '/',
      name: 'system',
      component: () => AsyncView.lazyLoadViews(import('./../components/system'))
    }
  ]
})
