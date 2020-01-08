<template>
  <data-table v-bind:opera="opera" v-bind:head="head" v-bind:operaClick="operaClick"
              v-bind:tableId="tableId" v-bind:toolbarId="toolbarId"></data-table>
</template>
<script>
import {dataTable} from '../../../../common/dataTable'
const AsyncView = require('../../../../common/common').AsyncView
export default {
  name: 'type-dictionary',
  data () {
    return {
      operaClick: this.$utils.operaClick,
      opera: {},
      head: this.item.tab,
      tableId: 'type-dictionary-table',
      toolbarId: 'type-dictionary-toolbar'
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
    })
  },
  updated () {
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
