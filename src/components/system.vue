<template>
  <div>
    <system-menu v-if="isLogin"></system-menu>
    <system-login v-if="!isLogin" v-bind:isLogin="isLogin" @introduce="getItem"></system-login>
  </div>
</template>

<script>
const AsyncView = require('../common/common').AsyncView
export default {
  name: 'system',
  data () {
    return {
      isLogin: false
    }
  },
  components: {
    'system-login': () => AsyncView.lazyLoadViews(import('./system/menu/systemLogin')),
    'system-menu': () => AsyncView.lazyLoadViews(import('./system/menu/menu'))
  },
  mounted () {
    this.$central.vue.$on('changeIsLogin', () => {
      this.isLogin = false
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
