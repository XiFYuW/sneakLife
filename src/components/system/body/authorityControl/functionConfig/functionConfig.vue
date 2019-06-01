<template>
  <div class="row">
    <div class="col-sm-2 col-md-3 sidebar treeViewMa">
      <tree-view></tree-view>
    </div>
    <div class="col-md-8 sidebar">
      <tree-grid v-bind:head="head"></tree-grid>
    </div>
  </div>
</template>

<script>
import {treeView} from '../../../../../common/treeview'
import {treeGrid} from '../../../../../common/treeGrid'

export default {
  name: 'function-config',
  components: {
    'tree-view': () => import('../../../../common/treeView'),
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
    let $ = this.$jquery
    let http = this.$http
    http.get(this.dataUrl).then(resp => {
      const options = this.$utils.parse(resp)
      treeView.options.data = options.data
      treeView.init(this.$jquery)
      treeView.nodeSelected(this.$jquery, (event, data) => {
        if (data.url !== '#') {
          http.get(data.url).then(resp => {
            const initDataTable = this.$utils.parse(resp)
            this.head = initDataTable.head
            initDataTable.table.columns[0].formatter = treeGrid.defalut.checkFormatter
            initDataTable.table.columns[2].formatter = treeGrid.defalut.stutsFormatter
            treeGrid.tl.columns = initDataTable.table.columns
            treeGrid.tl.url = initDataTable.table.url
            treeGrid.init($)
          })
        }
      })
    })
  }
}
</script>

<style scoped>
  .treeViewMa{
    margin-left: 80px;
  }
</style>
