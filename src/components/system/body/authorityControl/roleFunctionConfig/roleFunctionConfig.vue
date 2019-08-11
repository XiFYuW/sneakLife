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
import {operaClick} from '../../../../../common/common'
import {treeGrid} from '../../../../../common/treeGrid'
import {treeView} from '../../../../../common/treeview'
const treeViewCopy = require('../../../../../common/common').deepCopy.deepCopy(treeView)
const operaClickCopy = require('../../../../../common/common').deepCopy.deepCopy(operaClick)
const treeGridCopy = require('../../../../../common/common').deepCopy.deepCopy(treeGrid)
export default {
  name: 'role-function-config',
  components: {
    'tree-view': () => import('../../../../common/treeView'),
    'tree-grid': () => import('../../../../common/treeGrid'),
    'data-table': () => import('../../../../common/dataTable')
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
      toolbarId: 'role-function-config-toolbar'
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
            this.head = this.item.tab
            this.opera = initDataTable.opera
            initDataTable.table.columns.splice(0, 0, {
              'field': 'check',
              'checkbox': true
            })
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
              let parameter = {
                me: this.item.dataUrl,
                data: {treeViewId: this.item.id, menuId: data.id, name: data.text}
              }
              return {data: this.$central.enParameter(parameter)}
            }
            treeGridCopy.tl.responseHandler = resp => {
              return {
                data: resp.respData
              }
            }
            treeGridCopy.init($, this.tableId)
          })
        }
      })
    })

    this.operaClick.updateTable = (el, $, columns) => {
      let pageData = $('#role-function-config-table').bootstrapTable('getAllSelections')
      pageData.forEach(e => {
        this.$utils.delObj(e, '_nodes')
        this.$utils.delObj(e, '_parent')
      })
      this.$utils.central.send(this.$utils.http, {me: this.$utils.url, data: {up: pageData}}).then(resp => {
        this.$utils.central.toastr.success(resp.respMsg)
        $('#role-function-config-table').bootstrapTable('refresh')
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
