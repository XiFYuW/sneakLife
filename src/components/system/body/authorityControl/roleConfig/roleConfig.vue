<template>
  <data-table v-bind:opera="opera" v-bind:head="head" v-bind:operaClick="operaClick"></data-table>
</template>

<script>
import {operaClickCopy} from '../../../../../common/common'
import {bootstrapTableCopy} from '../../../../../common/bootstrapTable'

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
      bootstrapTableCopy.init('table', $, initDataTable.table, bootstrapTableCopy.tl)
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
