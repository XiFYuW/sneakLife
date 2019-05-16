<template>
  <div>
    <system-menu></system-menu>
    <function-modal></function-modal>
  </div>
</template>

<script>
import SystemMenu from './system/menu/menu'
import FunctionModal from './function/modal/modal'
export default {
  name: 'system',
  components: {
    SystemMenu,
    FunctionModal
  }
}
</script>

<style scoped>

</style>
