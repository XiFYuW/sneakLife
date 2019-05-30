<template>
  <div class="container">
    <tree-grid v-bind:head="head"></tree-grid>
  </div>
</template>

<script>
import {treeGrid} from '../../../../../common/treeGrid'
export default {
  name: 'role-function-config',
  components: {
    'tree-grid': () => import('../../../../common/treeGrid')
  },
  data () {
    return {
      head: ''
    }
  },
  props: {
    dataUrl: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$http.get(this.dataUrl).then(resp => {
      const initDataTable = this.$utils.parse(resp)
      this.head = initDataTable.head
      initDataTable.table.columns[0].formatter = treeGrid.defalut.checkFormatter
      initDataTable.table.columns[2].formatter = treeGrid.defalut.stutsFormatter
      treeGrid.init(this.$jquery, initDataTable.table)
    })
  }
}
</script>

<style scoped>

</style>
