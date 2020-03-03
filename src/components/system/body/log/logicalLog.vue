<template>
  <data-table v-bind:opera="opera" v-bind:head="head" v-bind:operaClick="operaClick"
              v-bind:tableId="tableId" v-bind:toolbarId="toolbarId"></data-table>
</template>
<script>
import {popover} from '../../../../common/popover'
const dataTable = require('../../../../common/common').deepCopy.deepCopy(require('../../../../common/dataTable').dataTable)
const AsyncView = require('../../../../common/common').AsyncView
export default {
  name: 'logical-log',
  data () {
    return {
      operaClick: this.$utils.operaClick,
      opera: {},
      head: this.item.tab,
      tableId: 'logical-log-table',
      toolbarId: 'logical-log-toolbar'
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
    this.$central.send(this.$utils.http, {me: this.item.pageUrl, data: {menuId: this.item.id}}).then(resp => {
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
      dataTable.tl.sortName = 'createDate'
      dataTable.tl.sortOrder = 'desc'
      dataTable.tl.columns = data.table.columns
      for (let index in dataTable.tl.columns) {
        let col = dataTable.tl.columns[index]
        if (this.$utils.endWith(col.field, 'Date')) {
          col.formatter = (value) => {
            return this.$utils.formatTime(value, 'Y/M/D h:m:s')
          }
        } else {
          col.formatter = (value, row, index) => {
            let uid = this.$utils.guid()
            return '<div class="logicalLog" id=' + uid + '>' + value + '</div>'
          }
        }
      }
      dataTable.tl.onLoadSuccess = (data) => {
        popover.applyLog(this.$jquery, 'logicalLog')
      }
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
  }
}
</script>
<style>
  @import "./../../../../css/log/popoverLog.css";
  .logicalLog{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 150px
  }
</style>
