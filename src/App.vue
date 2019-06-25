<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!-- router-link 定义点击后导航到哪个路径下 -->
    <!--<router-link to="/home">Home</router-link>-->
    <!--<router-link to="/about">About</router-link>-->
    <router-view/>
    <div>
      <hint-modal></hint-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  created: async function () {
    await this.$central.serverInit(this.$http)
  },
  components: {
    'hint-modal': () => import('./components/common/hintModal.vue')
  }
}
</script>
