<template>
  <div class="row">
    <div class="col-sm-2 col-md-3 sidebar treeViewMa">
      <tree-view></tree-view>
    </div>
    <div class="col-md-8 sidebar" style="display: none">
      <tree-grid v-bind:head="head"></tree-grid>
    </div>
  </div>
</template>

<script>
import {treeView} from '../../../../../common/treeview'
import {treeGrid} from '../../../../../common/treeGrid'
const treeViewCopy = require('../../../../../common/common').deepCopy.deepCopy(treeView)
const treeGridCopy = require('../../../../../common/common').deepCopy.deepCopy(treeGrid)
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
    item: {
      type: Object,
      required: true
    }
  },
  mounted () {
    let $ = this.$jquery
    let http = this.$utils.http
    this.$central.send(http, {me: this.item.pageUrl, data: {}}).then(resp => {
      treeViewCopy.options.data = resp.respData
      treeViewCopy.init(this.$jquery)
      treeViewCopy.nodeSelected(this.$jquery, (event, data) => {
        if (data.url !== '#') {
          http.get(data.url).then(resp => {
            const initDataTable = this.$utils.parse(resp)
            this.head = initDataTable.head
            initDataTable.table.columns[0].formatter = treeGridCopy.defalut.checkFormatter
            initDataTable.table.columns[2].formatter = treeGridCopy.defalut.stutsFormatter
            treeGridCopy.tl.columns = initDataTable.table.columns
            treeGridCopy.tl.url = initDataTable.table.url
            treeGridCopy.init($)
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
