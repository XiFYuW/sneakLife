<template>
  <data-table v-bind:opera="opera" v-bind:head="head" v-bind:operaClick="operaClick"
              v-bind:tableId="tableId" v-bind:toolbarId="toolbarId"></data-table>
</template>

<script>
import {operaClick} from '../../../../../common/common'
import {dataTable} from '../../../../../common/dataTable'
const operaClickCopy = require('../../../../../common/common').deepCopy.deepCopy(operaClick)
const dataTableCopy = require('../../../../../common/common').deepCopy.deepCopy(dataTable)
export default {
  name: 'role-config',
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
      tableId: 'role-config-table',
      toolbarId: 'role-config-toolbar'
    }
  },
  components: {
    'data-table': () => import('../../../../common/dataTable')
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
    })
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
