<template>
  <div class="container">
    <tree-grid v-bind:head="head"></tree-grid>
  </div>
</template>

<script>
import {treeGrid} from '../../../../../common/treeGrid'
const treeGridCopy = require('../../../../../common/common').deepCopy.deepCopy(treeGrid)
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
      initDataTable.table.columns[0].formatter = treeGridCopy.defalut.checkFormatter
      initDataTable.table.columns[2].formatter = treeGridCopy.defalut.stutsFormatter
      treeGridCopy.tl.columns = initDataTable.table.columns
      treeGridCopy.tl.url = initDataTable.table.url
      treeGridCopy.tl.pagination = true
      treeGridCopy.init(this.$jquery)
    })
  }
}
</script>

<style scoped>

</style>
