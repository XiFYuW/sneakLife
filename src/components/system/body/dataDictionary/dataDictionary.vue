<template>
  <data-table v-bind:opera="opera" v-bind:head="head" v-bind:operaClick="operaClick"></data-table>
</template>
<script>
import {operaClick} from '../../../../common/common'
import {dataTable} from '../../../../common/dataTable'
const operaClickCopy = require('../../../../common/common').deepCopy.deepCopy(operaClick)
const dataTableCopy = require('../../../../common/common').deepCopy.deepCopy(dataTable)
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
      head: ''
    }
  },
  components: {
    'data-table': () => import('../../../common/dataTable')
  },
  props: {
    dataUrl: {
      type: String,
      required: true
    }
  },
  mounted () {
    let $ = this.$jquery
    this.$http.get(this.dataUrl).then(resp => {
      const initDataTable = this.$utils.parse(resp)
      this.opera = initDataTable.opera
      this.head = initDataTable.head
      dataTableCopy.init('table', $, initDataTable.table, dataTableCopy.tl)
    })
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
