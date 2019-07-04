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
          this.$central.send(http, {me: data.url, data: {menuId: this.item.id}}).then(resp => {
            const initDataTable = resp.respData
            this.head = initDataTable.head
            initDataTable.table.columns.splice(0, 0, {
              'field': 'check',
              'checkbox': true
            })
            if (initDataTable.table.columns[1].field !== 'name') {
              let temp = initDataTable.table.columns[1]
              let cons = this.findArray(initDataTable.table.columns, 'name')
              initDataTable.table.columns[1] = cons[0]
              initDataTable.table.columns[cons[1]] = temp
            }
            initDataTable.table.columns[0].formatter = treeGridCopy.defalut.checkFormatter
            initDataTable.table.columns[2].formatter = treeGridCopy.defalut.statusFormatter
            treeGridCopy.tl.columns = initDataTable.table.columns
            treeGridCopy.tl.url = this.$central.url
            treeGridCopy.tl.queryParams = params => {
              let parameter = {
                me: this.item.dataUrl,
                data: {menuId: data.id, treeViewId: this.item.id, name: data.text}
              }
              return {data: this.$central.enParameter(parameter)}
            }
            treeGridCopy.tl.responseHandler = resp => {
              return {
                data: resp.respData
              }
            }
            treeGridCopy.init($)
          })
        }
      })
    })
  },
  methods: {
    findArray: (arr, item) => {
      let array = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].field === item) {
          array.push(arr[i])
          array.push(i)
          return array
        }
      }
    }
  }
}
</script>

<style scoped>
  .treeViewMa{
    margin-left: 80px;
  }
</style>
