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
      tableId: 'function-button-config',
      toolbarId: 'function-button-config-toolbar',
      menuIdTemp: ''
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
      treeViewCopy.init($)
      treeViewCopy.nodeSelected($, (event, data) => {
        this.isShowData = true
        if (data.url !== '#') {
          this.$central.send(http, {me: data.url, data: {menuId: this.item.id}}).then(resp => {
            const initDataTable = resp.respData
            this.head = this.item.tab + ' - ' + data.text
            this.opera = initDataTable.opera
            this.menuIdTemp = data.id
            dataTableCopy.tl.queryParams = params => {
              let parameter = {
                me: this.item.dataUrl,
                pag: {
                  // 页面大小
                  rows: params.limit,
                  // 页码
                  page: params.offset / params.limit,
                  // 排序列名
                  sort: params.sort,
                  // 排序命令（desc，asc）
                  sortOrder: params.order
                },
                data: {menuId: this.menuIdTemp, name: data.text}
              }
              return {data: this.$central.enParameter(parameter)}
            }
            dataTableCopy.tl.url = this.$central.url
            dataTableCopy.tl.toolbar = '#' + this.toolbarId
            dataTableCopy.tl.responseHandler = resp => {
              return {
                total: resp.respData.totalElements,
                rows: resp.respData.content
              }
            }
            dataTableCopy.tl.columns = initDataTable.table.columns
            dataTableCopy.tl.columns.splice(0, 0, {
              'checkbox': true,
              'data-halign': 'center'
            })
            dataTableCopy.init(this.tableId, this.$jquery, dataTableCopy.tl)
          })
        }
      })
    })

    this.operaClick.addTable = (el, $, columns) => {
      columns.forEach(item => {
        item.forEach((v, index) => {
          v.value = ''
          v.menuIdTemp = this.menuIdTemp
          item.splice(index, index + 1, v)
        })
      })
      this.$utils.modalFrame.show($)
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
