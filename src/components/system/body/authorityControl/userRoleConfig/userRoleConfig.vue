<template>
  <div id="point">
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
            let id = 'row' + row.id
            let ids = 'rows' + row.id
            return '<div id=' + id + '><div class="rowOperator" id=' + ids + '></div></div>'
          }
        },
        load: {
          com: {
            template: '<common-select></common-select>'
          },
          vue: this.$vue
        }
      }
    }
  },
  components: {
    'data-table': () => import('../../../../common/dataTable')
  },
  props: {
    dataUrl: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
  .select-padd{
    padding: 0;
  }
</style>
