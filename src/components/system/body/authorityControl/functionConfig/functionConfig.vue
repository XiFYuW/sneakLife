<template>
  <div class="row">
    <div class="col-sm-2 col-md-2 sidebar treeViewMa">
      <tree-view></tree-view>
    </div>
    <div class="col-md-9 sidebar" v-if="is">
      <tree-grid v-bind:opera="opera" v-bind:head="head" v-bind:operaClick="operaClick"></tree-grid>
    </div>
  </div>
</template>

<script>
import {treeView} from '../../../../../common/treeview'
import {treeGrid} from '../../../../../common/treeGrid'
import {operaClick} from '../../../../../common/common'
const treeViewCopy = require('../../../../../common/common').deepCopy.deepCopy(treeView)
const treeGridCopy = require('../../../../../common/common').deepCopy.deepCopy(treeGrid)
const operaClickCopy = require('../../../../../common/common').deepCopy.deepCopy(operaClick)
export default {
  name: 'function-config',
  components: {
    'tree-view': () => import('../../../../common/treeView'),
    'tree-grid': () => import('../../../../common/treeGrid')
  },
  data () {
    return {
      /**
       * 操作按钮的动作
       */
      operaClick: operaClickCopy,
      /**
       * 功能按钮
       */
      opera: {},
      /**
       * 标题头
       */
      head: this.item.tab,
      is: false
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
        this.is = true
        if (data.url !== '#') {
          this.$central.send(http, {me: data.url, data: {menuId: this.item.id}}).then(resp => {
            const initDataTable = resp.respData
            this.head = this.item.tab + ' - ' + data.text
            this.opera = initDataTable.opera
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
  },
  watch: {
    opera: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.opera = newVal
        }
      }
    },
    immediate: true,
    deep: true
  }
}
</script>

<style scoped>
  .treeViewMa{
    margin-left: 60px;
  }
</style>
