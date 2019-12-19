<template>
  <div class="row suitable">
    <div class="col-sm-2 col-md-2 sidebar treeViewMa">
      <tree-view v-bind:id="treeViewId"></tree-view>
    </div>
    <div class="col-md-9 sidebar" v-if="isShowData">
      <data-table v-bind:opera="opera" v-bind:head="head" v-bind:operaClick="operaClick"
                  v-bind:tableId="tableId" v-bind:toolbarId="toolbarId"></data-table>
    </div>
  </div>
</template>

<script>
import {operaClick} from '../../../../../common/common'
import {dataTable} from '../../../../../common/dataTable'
const operaClickCopy = require('../../../../../common/common').deepCopy.deepCopy(operaClick)
const dataTableCopy = require('../../../../../common/common').deepCopy.deepCopy(dataTable)
const AsyncView = require('../../../../../common/common').AsyncView
export default {
  name: 'function-button-config',
  components: {
    'tree-view': () => AsyncView.lazyLoadViews(import('../../../../common/treeView')),
    'data-table': () => AsyncView.lazyLoadViews(import('../../../../common/dataTable'))
  },
  data () {
    return {
      operaClick: operaClickCopy,
      opera: {},
      head: this.item.tab,
      isShowData: false,
      tableId: 'function-button-config',
      toolbarId: 'function-button-config-toolbar',
      treeViewId: 'treeViewId' + this.item.id,
      menuIdTemp: '',
      selectData: {}
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created () {
    this.$central.send(this.$utils.http, {me: this.item.pageUrl, data: {menuId: this.item.id}}).then(resp => {
      let $ = this.$jquery
      this.$utils.selectsTree.options.data = resp.respData
      this.$utils.selectsTree.init($, this.treeViewId)
      this.$utils.selectsTree.nodeSelected($, (event, data) => {
        this.isShowData = true
        if (data.url !== '#') {
          this.$central.send(this.$utils.http, {me: data.url, data: {menuId: this.item.id}}).then(resp => {
            const initDataTable = resp.respData
            this.head = this.item.tab + ' - ' + data.text
            this.opera = initDataTable.opera
            this.menuIdTemp = data.id
            dataTableCopy.tl.queryParams = params => {
              return dataTableCopy.queryParams(params, this.item.dataUrl, {menuId: this.menuIdTemp, name: data.text}, this.$central)
            }
            dataTableCopy.tl.url = this.$central.url
            dataTableCopy.tl.toolbar = '#' + this.toolbarId
            dataTableCopy.tl.responseHandler = resp => {
              return dataTableCopy.responseHandler(resp, this.$central)
            }
            dataTableCopy.tl.columns = initDataTable.table.columns
            dataTableCopy.tl.columns.splice(0, 0, dataTableCopy.checkbox)
            dataTableCopy.init(this.tableId, this.$jquery, dataTableCopy.tl)

            // 初始化下拉列表
            let express = '178b8e17c57911e9bd4f80fa5b3a283a:6,179c7a6fc57911e9bd4f80fa5b3a283a:2,17a428fec57911e9bd4f80fa5b3a283a:1'
            this.$utils.central.send(this.$utils.http, {me: 'getByType', data: {express: express, menuId: this.item.id}}).then(resp => {
              this.selectData = resp.respData.data
              let columns = this.opera.in
              this.operaClick.operaInEach(columns, data, (v, index, item, data) => {
                this.operaClick.initSelects(v, index, item, data, this.selectData)
              })
            })
          })
        }
      })
    })
  },
  updated () {
    this.operaClick.addTable = (el, $, columns) => {
      this.operaClick.operaInEach(columns, null, (v, index, item, data) => {
        this.$utils.clearAll($, v)
        this.$utils.vue.set(v, 'menuIdTemp', this.menuIdTemp)
        item.splice(index, index + 1, v)
      })
      this.$utils.modalFrame.show($)
    }

    this.operaClick.updateTable = (el, $, columns) => {
      let data = $('#' + el).bootstrapTable('getAllSelections')
      if (this.operaClick.hint(data)) {
        this.$utils.setId(data[0].id)
        this.operaClick.operaInEach(columns, data, (v, index, item, data) => {
          this.$utils.setInputValue($, v, index, item, data, ($, key, v, p, row, item, index) => {
            this.$utils.setValueBySelects($, key, v, p, row, item, index, this.selectData)
          })
        })
        this.$utils.modalFrame.show($)
      }
    }
  }
}
</script>

<style scoped>
  .treeViewMa{
    margin-left: 60px;
    width: max-content;
  }
</style>
