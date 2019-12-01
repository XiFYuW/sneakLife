<template>
  <data-table v-bind:opera="opera" v-bind:head="head" v-bind:operaClick="operaClick"
              v-bind:tableId="tableId" v-bind:toolbarId="toolbarId"></data-table>
</template>
<script>
import {operaClick} from '../../../../common/common'
import {dataTable} from '../../../../common/dataTable'
const operaClickCopy = require('../../../../common/common').deepCopy.deepCopy(operaClick)
const dataTableCopy = require('../../../../common/common').deepCopy.deepCopy(dataTable)
const AsyncView = require('../../../../common/common').AsyncView
export default {
  name: 'system-function',
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
      tableId: 'system-function-table',
      toolbarId: 'system-function-toolbar',
      selectTreeData: {},
      menuIdTemp: ''
    }
  },
  components: {
    'data-table': () => AsyncView.lazyLoadViews(import('../../../common/dataTable'))
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.$utils.central.send(this.$utils.http, {me: this.item.pageUrl, data: {menuId: this.item.id}}).then(resp => {
      const data = resp.respData
      this.opera = data.opera
      dataTableCopy.tl.queryParams = params => {
        return dataTableCopy.queryParams(params, this.item.dataUrl, null, this.$central)
      }
      dataTableCopy.tl.url = this.$central.url
      dataTableCopy.tl.toolbar = '#' + this.toolbarId
      dataTableCopy.tl.responseHandler = resp => {
        return dataTableCopy.responseHandler(resp, this.$central)
      }
      dataTableCopy.tl.columns = data.table.columns
      dataTableCopy.tl.columns.splice(0, 0, dataTableCopy.checkbox)
      dataTableCopy.init(this.tableId, this.$jquery, dataTableCopy.tl)

      let express = '0a933692133d11eaa3ed80fa5b3a283a:*'
      this.$utils.central.send(this.$utils.http, {me: 'selectTreeView', data: {express: express, menuId: this.item.id}}).then(resp => {
        this.selectTreeData = resp.respData
        let columns = this.opera.in
        this.operaClick.operaInEach(columns, data, (v, index, item, data) => {
          let ds = this.selectTreeData[v.field]
          if (ds) {
            // 给v增加v.field + 'selectTreeData'属性，修改数据操作可以匹配去取值
            this.$utils.vue.set(v, v.field + 'SelectTreeData', ds)
          }
          item.splice(index, index + 1, v)
        })
      })
    })
  },
  updated () {
    this.operaClick.addTable = (el, $, columns) => {
      this.operaClick.operaInEach(columns, null, (v, index, item, data) => {
        this.$utils.clearAll($, v)
      })
      this.$utils.modalFrame.show($)
    }

    this.operaClick.updateTable = (el, $, columns) => {
      let data = $('#' + el).bootstrapTable('getAllSelections')
      if (this.operaClick.hint(data)) {
        this.$utils.setId(data[0].id)
        this.operaClick.operaInEach(columns, data, (v, index, item, data) => {
          let key = v.field
          for (let i = 0; i < data.length; i++) {
            let jsons = data[i]
            for (let p in jsons) {
              if (key === p) {
                let td = this.selectTreeData[key]
                if (td) {
                  this.$utils.selectsTree.setSelectTreeVal($, p, v, jsons)
                } else {
                  // 对应key,增加value属性
                  this.$utils.vue.set(v, 'value', jsons[p])
                }
                item.splice(index, index + 1, v)
              }
            }
          }
        })
        this.$utils.modalFrame.show($)
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
