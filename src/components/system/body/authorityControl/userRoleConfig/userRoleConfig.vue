<template>
  <div>
    <data-table v-bind:dataUrl="dataUrl" v-bind:handle="handle"></data-table>
  </div>
</template>

<script>
export default {
  name: 'user-role-config',
  data () {
    return {
      handle: {
        operate: {
          field: 'operate',
          title: '操作',
          align: 'center',
          formatter: function (value, row, index) {
            return '<common-select></common-select>'
          }
        }
      }
    }
  },
  components: {
    'data-table': () => import('../../../../common/dataTable'),
    'common-select': () => import('../../../../common/commonSelect')
  },
  props: {
    dataUrl: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.$forceUpdate()
    })
  }
}
</script>

<style scoped>

</style>
