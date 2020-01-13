<template>
  <div>
    <system-menu v-if="isLogin"></system-menu>
    <system-login v-if="!isLogin" v-bind:isLogin="isLogin" @introduce="getItem"></system-login>
    <resp-load v-if="isRespLoad"></resp-load>
  </div>
</template>

<script>
const AsyncView = require('../common/common').AsyncView
export default {
  name: 'system',
  data () {
    return {
      isLogin: false,
      isRespLoad: false
    }
  },
  components: {
    'resp-load': () => AsyncView.lazyLoadViews(import('./load/respLoad')),
    'load': () => AsyncView.lazyLoadViews(import('./load/load')),
    'system-login': () => AsyncView.lazyLoadViews(import('./system/menu/systemLogin')),
    'system-menu': () => AsyncView.lazyLoadViews(import('./system/menu/menu'))
  },
  created () {
    this.$central.getCookieStorageItem((skJson) => {
      this.$central.getLocalStorageItem(() => {
        this.$central.init(skJson)
        this.isLogin = true
      }, () => {})
    }, () => {
      this.isLogin = false
    })
  },
  mounted () {
    this.$central.vue.$on('changeIsLogin', () => {
      this.isLogin = false
    })
    this.$central.vue.$on('isRespLoad', (isRespLoad) => {
      this.isRespLoad = isRespLoad
    })
  },
  methods: {
    getItem: function (item) {
      this.isLogin = item.isLogin
    }
  }
}
</script>

<style scoped>

</style>
