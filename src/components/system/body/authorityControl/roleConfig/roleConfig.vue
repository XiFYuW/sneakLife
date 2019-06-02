<template>
  <data-table v-bind:opera="opera" v-bind:head="head" v-bind:operaClick="operaClick"></data-table>
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
      head: ''
    }
  },
  components: {
    'data-table': () => import('../../../../common/dataTable')
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
  props: {
    dataUrl: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
