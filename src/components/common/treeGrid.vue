<template>
  <div>
    <div class="panel panel-default">
      <div class="panel-heading" v-if="head">{{head}}</div>
      <div class="panel-body"></div>
      <table id="treeGrid"></table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree-grid',
  props: {
    head: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>

</style>
