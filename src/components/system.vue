<template>
  <div>
    <system-menu></system-menu>
  </div>
</template>

<script>
export default {
  name: 'system',
  components: {
    'system-menu': () => import('./system/menu/menu')
  }
}
</script>

<style scoped>

</style>
