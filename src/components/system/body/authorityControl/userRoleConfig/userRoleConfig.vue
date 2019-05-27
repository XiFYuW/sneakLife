<template>
  <div id="point">
    <data-table v-bind:dataUrl="dataUrl" v-bind:handle="handle"></data-table>
  </div>
</template>

<script>
import CommonSelect from '../../../../common/commonSelect'
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
        selecting: {
          com: {
            template: '<common-select v-bind:dataSelect="dataSelect"></common-select>'
          },
          vue: this.$vue,
          dataSelect: {}
        }
      },
      dataSelect: {}
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
  },
  created () {
    this.$http.get('static/json/system/body/AuthorityControl/userRoleConfig/selects.json').then(resp => {
      this.handle.selecting.dataSelect = this.$common.parse(resp)
      // 全局初始化CommonSelect
      this.$vue.component('common-select', CommonSelect)
    })
  }
}
</script>

<style>
  .select-padd{
    padding: 0;
  }
</style>
