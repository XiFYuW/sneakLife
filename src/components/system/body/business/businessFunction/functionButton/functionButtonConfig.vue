<template>
  <div class="row">
    <div class="col-sm-2 col-md-2 sidebar treeViewMa">
      <tree-view></tree-view>
    </div>
    <div class="col-md-9 sidebar" v-if="isShowData">
      <data-table v-bind:opera="opera" v-bind:head="head" v-bind:operaClick="operaClick"
                  v-bind:tableId="tableId" v-bind:toolbarId="toolbarId"></data-table>
    </div>
  </div>
</template>

<script>
import {treeView} from '../../../../../../common/treeview'
import {operaClick} from '../../../../../../common/common'
import {dataTable} from '../../../../../../common/dataTable'
const treeViewCopy = require('../../../../../../common/common').deepCopy.deepCopy(treeView)
const operaClickCopy = require('../../../../../../common/common').deepCopy.deepCopy(operaClick)
const dataTableCopy = require('../../../../../../common/common').deepCopy.deepCopy(dataTable)
export default {
  name: 'function-button-config',
  components: {
    'tree-view': () => import('../../../../../common/treeView'),
    'data-table': () => import('../../../../../common/dataTable')
  },
  data () {
    return {
      operaClick: operaClickCopy,
      opera: {},
      head: this.item.tab,
      isShowData: false,
      tableId: 'function-button-config',
      toolbarId: 'function-button-config-toolbar',
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
      treeViewCopy.options.data = resp.respData
      treeViewCopy.init($)
      treeViewCopy.nodeSelected($, (event, data) => {
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
            this.$utils.central.send(this.$utils.http, {me: 'getByType', data: {type: '35,32,65'}}).then(resp => {
              let $ = this.$jquery
              this.selectData = resp.respData.data
              let columns = this.opera.in
              this.operaClick.operaInEach(columns, data, (v, index, item, data) => {
                let obj = $('#' + v.id)
                this.$utils.selects.setVal(obj, '')
                // 下来列表赋值
                let ds = this.selectData[v.field]
                if (ds) {
                  this.$utils.vue.set(v, v.field + 'SelectData', ds)
                }
                item.splice(index, index + 1, v)
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
          this.$utils.byPageData($, data, v, item, index, this.selectData)
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
