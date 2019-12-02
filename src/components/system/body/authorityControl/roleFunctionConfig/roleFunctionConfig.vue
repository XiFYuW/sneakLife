<template>
  <div class="row">
    <div class="col-sm-2 col-md-2 sidebar treeViewMa">
      <tree-view v-bind:id="treeViewId"></tree-view>
    </div>
    <div class="col-md-9 sidebar" v-if="is">
      <data-table v-bind:opera="opera" v-bind:head="head" v-bind:operaClick="operaClick"
                  v-bind:tableId="tableId" v-bind:toolbarId="toolbarId"></data-table>
    </div>
  </div>
</template>

<script>
import {operaClick} from '../../../../../common/common'
import {treeGrid} from '../../../../../common/treeGrid'
const operaClickCopy = require('../../../../../common/common').deepCopy.deepCopy(operaClick)
const treeGridCopy = require('../../../../../common/common').deepCopy.deepCopy(treeGrid)
const AsyncView = require('../../../../../common/common').AsyncView
export default {
  name: 'role-function-config',
  components: {
    'tree-view': () => AsyncView.lazyLoadViews(import('../../../../common/treeView')),
    'tree-grid': () => AsyncView.lazyLoadViews(import('../../../../common/treeGrid')),
    'data-table': () => AsyncView.lazyLoadViews(import('../../../../common/dataTable'))
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
      is: false,
      head: this.item.tab,
      tableId: 'role-function-config-table',
      toolbarId: 'role-function-config-toolbar',
      treeViewId: 'treeViewId' + this.item.id
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
      this.$utils.selectsTree.options.data = resp.respData
      this.$utils.selectsTree.init(this.$jquery, this.treeViewId)
      this.$utils.selectsTree.nodeSelected(this.$jquery, (event, data) => {
        this.is = true
        if (data.url !== '#') {
          this.$central.send(http, {me: data.url, data: {menuId: this.item.id}}).then(resp => {
            const initDataTable = resp.respData
            this.head = this.item.tab
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

    this.operaClick.updateTable = (el, $, columns) => {
      let obj = $('#' + this.tableId)
      let pageData = obj.bootstrapTable('getAllSelections')
      pageData.forEach(e => {
        this.$utils.delObjProperty(e, '_nodes')
        this.$utils.delObjProperty(e, '_parent')
      })
      this.$utils.central.send(this.$utils.http, {me: this.$utils.url, data: {up: pageData}}).then(resp => {
        this.$utils.central.toastr.success(resp.respMsg)
        obj.bootstrapTable('refresh')
      })
    }
  }
}
</script>

<style scoped>
  .treeViewMa{
    margin-left: 60px;
  }
</style>
