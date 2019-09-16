<template>
  <div>
    <system-menu></system-menu>
  </div>
</template>

<script>
const AsyncView = require('../common/common').AsyncView
export default {
  name: 'system',
  components: {
    'system-menu': () => AsyncView.lazyLoadViews(import('./system/menu/menu'))
  }
}
</script>

<style scoped>

</style>
