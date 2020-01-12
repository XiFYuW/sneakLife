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
    let sk = sessionStorage.getItem('sk')
    let to = sessionStorage.getItem('to')
    if (sk !== null && to !== null) {
      let skAes = this.$central.aesDecrypt(sk, to)
      let skJson = JSON.parse(skAes)
      if (skJson !== undefined || skJson !== null) {
        this.isLogin = true
        this.$central.init(skJson)
      }
    }
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
