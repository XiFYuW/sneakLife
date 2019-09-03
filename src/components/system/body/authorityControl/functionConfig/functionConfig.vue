<template>
  <div class="row">
    <div class="col-sm-2 col-md-2 sidebar treeViewMa">
      <tree-view></tree-view>
    </div>
    <div class="col-md-9 sidebar" v-if="is">
      <data-table v-bind:opera="opera" v-bind:head="head" v-bind:operaClick="operaClick"
                  v-bind:tableId="tableId" v-bind:toolbarId="toolbarId"></data-table>
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
    'tree-grid': () => import('../../../../common/treeGrid'),
    'data-table': () => import('../../../../common/dataTable')
  },
  data () {
    return {
      operaClick: operaClickCopy,
      opera: {},
      head: this.item.tab,
      is: false,
      tableId: 'function-config-treeGrid',
      toolbarId: 'function-config-toolbar'
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
    this.$central.send(http, {me: this.item.pageUrl, data: {menuId: this.item.id}}).then(resp => {
      treeViewCopy.options.data = resp.respData
      treeViewCopy.init(this.$jquery)
      treeViewCopy.nodeSelected(this.$jquery, (event, data) => {
        this.is = true
        if (data.url !== '#') {
          this.$central.send(http, {me: data.url, data: {menuId: this.item.id}}).then(resp => {
            const initDataTable = resp.respData
            this.head = this.item.tab + ' - ' + data.text
            this.opera = initDataTable.opera
            initDataTable.table.columns.splice(0, 0, treeGridCopy.checkbox)
            if (initDataTable.table.columns[1].field !== 'name') {
              let temp = initDataTable.table.columns[1]
              let cons = this.$utils.findArray(initDataTable.table.columns, 'name')
              initDataTable.table.columns[1] = cons[0]
              initDataTable.table.columns[cons[1]] = temp
            }
            initDataTable.table.columns[0].formatter = treeGridCopy.defalut.checkFormatter
            initDataTable.table.columns[2].formatter = treeGridCopy.defalut.statusFormatter
            treeGridCopy.tl.columns = initDataTable.table.columns
            treeGridCopy.tl.toolbar = '#' + this.toolbarId
            treeGridCopy.tl.url = this.$central.url
            treeGridCopy.tl.queryParams = params => {
              return treeGridCopy.queryParams(params, this.item.dataUrl, {treeViewId: this.item.id, menuId: data.id, name: data.text}, this.$central)
            }
            treeGridCopy.tl.responseHandler = resp => {
              return treeGridCopy.responseHandler(resp, this.$central)
            }
            treeGridCopy.init($, this.tableId)
          })
        }
      })
    })

    this.operaClick.addTable = (el, $, columns) => {
      let pageData = $('#function-config-treeGrid').bootstrapTable('getData')
      let data = this.buildTreeViewList(pageData)
      columns.forEach(item => {
        item.forEach((v, index) => {
          if (v.field === 'id') {
            this.$utils.vue.set(v, 'value', data)
          }
        })
      })
      this.$utils.modalFrame.show($)
    }

    this.operaClick.updateTable = (el, $, columns) => {
      let pageData = $('#function-config-treeGrid').bootstrapTable('getData')
      pageData.forEach(e => {
        this.$utils.delObjProperty(e, '_nodes')
        this.$utils.delObjProperty(e, '_parent')
      })
      this.$utils.central.send(this.$utils.http, {me: this.$utils.url, data: {up: pageData}}).then(resp => {
        this.$utils.central.toastr.success(resp.respMsg)
        $('#function-config-treeGrid').bootstrapTable('refresh')
      })
    }

    this.operaClick.deleteTable = (el, $, columns) => {
      let pageData = $('#function-config-treeGrid').bootstrapTable('getData')
      let data = this.buildTreeViewList(pageData)
      columns.forEach(item => {
        item.forEach((v, index) => {
          if (v.field === 'id') {
            this.$utils.vue.set(v, 'value', data)
          }
        })
      })
      this.$utils.modalFrame.show($)
    }
  },
  methods: {
    findParent: function (parent, data, obj) {
      for (let j = 0; j < data.length; j++) {
        let item = data[j]
        let is = item.id === parent.id
        if (item.hasOwnProperty('nodes') && !is) {
          data = this.findParent(parent, data[j], obj)
        } else if (item.hasOwnProperty('nodes') && is) {
          item['nodes'].push(obj)
        } else {
          item['nodes'] = []
          item['nodes'].push(obj)
        }
      }
      return data
    },
    buildTreeViewList: function (pageData) {
      let data = []
      for (let i = 0; i < pageData.length; i++) {
        let item = pageData[i]
        let obj = {text: item.name, value: item.treeViewId, id: item.id}
        let nodes = item._nodes
        if (nodes.length > 0) {
          if (item.hasOwnProperty('_parent')) {
            let parent = item._parent
            obj.tempMenuId = parent.treeViewId
            data = this.findParent(parent, data, obj)
          } else {
            data.push(obj)
          }
        }
      }
      return data
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
    width: max-content;
  }
</style>
