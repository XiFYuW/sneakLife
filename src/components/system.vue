<template>
  <div>
    <system-menu></system-menu>
    <function-modal></function-modal>
  </div>
</template>

<script>
export default {
  name: 'system',
  components: {
    'system-menu': () => import('./system/menu/menu'),
    'function-modal': () => import('./function/modal/modal')
  }
}
</script>

<style scoped>

</style>
