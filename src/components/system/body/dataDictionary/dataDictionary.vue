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
  name: 'data-dictionary',
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
      tableId: 'data-dictionary-table',
      toolbarId: 'data-dictionary-toolbar',
      selectData: {},
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

      this.$utils.central.send(this.$utils.http, {me: 'getByType', data: {express: '16f8029c956911e9914980fa5b3a283a:*', menuId: this.item.id}}).then(resp => {
        this.selectData = resp.respData.data
        let ini = this.opera.in
        this.operaClick.operaInEach(ini, data, (v, index, item, data) => {
          this.operaClick.initSelects(v, index, item, data, this.selectData)
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
          this.$utils.setInputValue($, v, index, item, data, ($, key, v, p, row, item, index) => {
            this.$utils.setValueBySelects($, key, v, p, row, item, index, this.selectData)
          })
        })
        this.$utils.modalFrame.show($)
      }
    }

    this.operaClick.search = function () {
      alert('search1')
    }

    this.operaClick.remove = function () {
      alert('remove1')
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
