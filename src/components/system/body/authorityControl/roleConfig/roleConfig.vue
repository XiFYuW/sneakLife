<template>
  <data-table v-bind:opera="opera" v-bind:head="head" v-bind:operaClick="operaClick"
              v-bind:tableId="tableId" v-bind:toolbarId="toolbarId"></data-table>
</template>

<script>
import {dataTable} from '../../../../../common/dataTable'
const AsyncView = require('../../../../../common/common').AsyncView
export default {
  name: 'role-config',
  data () {
    return {
      /**
       * 操作按钮的动作
       */
      operaClick: this.$utils.operaClick,
      /**
       * 功能按钮
       */
      opera: {},
      /**
       * 标题头
       */
      head: this.item.tab,
      tableId: 'role-config-table',
      toolbarId: 'role-config-toolbar',
      selectData: {}
    }
  },
  components: {
    'data-table': () => AsyncView.lazyLoadViews(import('../../../../common/dataTable'))
  },
  mounted () {
    this.$utils.central.send(this.$utils.http, {me: this.item.pageUrl, data: {menuId: this.item.id}}).then(resp => {
      const data = resp.respData
      this.opera = data.opera
      dataTable.tl.queryParams = params => {
        return dataTable.queryParams(params, this.item.dataUrl, null, this.$central)
      }
      dataTable.tl.url = this.$central.url
      dataTable.tl.toolbar = '#' + this.toolbarId
      dataTable.tl.responseHandler = resp => {
        return dataTable.responseHandler(resp, this.$central, () => {
          dataTable.refresh(this.tableId, this.$jquery, dataTable.tl)
        })
      }
      dataTable.tl.columns = data.table.columns
      dataTable.tl.columns.splice(0, 0, dataTable.checkbox)
      dataTable.init(this.tableId, this.$jquery, dataTable.tl)

      this.$utils.central.send(this.$utils.http, {me: 'getByType', data: {express: '58837670b66111e985a680fa5b3a283a:7', menuId: this.item.id}}).then(resp => {
        this.selectData = resp.respData.data
        let ini = this.opera.in
        this.operaClick.operaInEach(ini, data, (v, index, item, data) => {
          this.operaClick.initSelects(v, index, item, data, this.selectData)
        })
        this.operaClick.operaInEach(this.opera.bo, data, (v, index, item, data) => {
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

    this.operaClick.search = () => {
      let searchData = this.$utils.searchData(this.$jquery, this.opera.bo)
      dataTable.tl.queryParams = params => {
        return dataTable.queryParams(params, this.item.dataUrl, searchData, this.$central)
      }
      dataTable.init(this.tableId, this.$jquery, dataTable.tl)
    }

    this.operaClick.remove = () => {
      this.operaClick.operaInEach(this.opera.bo, null, (v, index, item, data) => {
        this.$utils.clearAll(this.$jquery, v)
      })
    }
  },
  props: {
    item: {
      type: Object,
      required: true
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

</style>
