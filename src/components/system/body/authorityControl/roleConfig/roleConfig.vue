<template>
  <data-table v-bind:dataUrl="dataUrl"></data-table>
</template>

<script>
export default {
  name: 'role-config',
  components: {
    'data-table': () => import('../../../../common/dataTable')
  },
  props: {
    dataUrl: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
