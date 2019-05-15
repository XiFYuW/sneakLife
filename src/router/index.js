import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'system-menu',
      component: () => import('@/components/system/menu/menu')
    }
  ]
})
