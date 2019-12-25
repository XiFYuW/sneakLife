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
  name: 'function-columns-config',
  components: {
    'tree-view': () => AsyncView.lazyLoadViews(import('../../../../common/treeView')),
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
      head: this.item.tab,
      isShowData: false,
      tableId: 'function-columns-config',
      toolbarId: 'function-columns-config-toolbar',
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
              return dataTableCopy.responseHandler(resp, this.$central, () => {
                dataTableCopy.refresh(this.tableId, this.$jquery, dataTableCopy.tl)
              })
            }
            dataTableCopy.tl.columns = initDataTable.table.columns
            dataTableCopy.tl.columns.splice(0, 0, dataTableCopy.checkbox)
            dataTableCopy.init(this.tableId, this.$jquery, dataTableCopy.tl)

            let express = 'edca09efc62111e9bd4f80fa5b3a283a:4'
            this.$utils.central.send(this.$utils.http, {me: 'getByType', data: {express: express, menuId: this.item.id}}).then(resp => {
              this.selectData = resp.respData.data
              this.operaClick.operaInEach(this.opera.in, data, (v, index, item, data) => {
                this.operaClick.initSelects(v, index, item, data, this.selectData)
              })
              this.operaClick.operaInEach(this.opera.bo, data, (v, index, item, data) => {
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

    this.operaClick.search = () => {
      let searchData = this.$utils.searchData(this.$jquery, this.opera.bo)
      this.$utils.addObjProperty(searchData, 'menuId', this.menuIdTemp)
      dataTableCopy.tl.queryParams = params => {
        return dataTableCopy.queryParams(params, this.item.dataUrl, searchData, this.$central)
      }
      dataTableCopy.init(this.tableId, this.$jquery, dataTableCopy.tl)
    }

    this.operaClick.remove = () => {
      this.operaClick.operaInEach(this.opera.bo, null, (v, index, item, data) => {
        this.$utils.clearAll(this.$jquery, v)
      })
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
