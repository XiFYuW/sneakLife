<template>
    <div :id="id"></div>
</template>

<script>
export default {
  name: 'tree-view',
  props: {
    id: {
      type: String,
      required: false
    }
  },
  watch: {
    id: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.id = newVal
        }
      }
    },
    immediate: true,
    deep: true
  }
}
</script>

<style scoped>

</style>
