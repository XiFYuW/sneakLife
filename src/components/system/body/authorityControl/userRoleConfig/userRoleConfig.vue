<template>
  <div id="point">
    <data-table v-bind:dataUrl="dataUrl" v-bind:handle="handle" v-bind:operaClick="operaClick"></data-table>
  </div>
</template>

<script>
import CommonSelect from '../../../../common/commonSelect'
import {operaClick} from '../../../../../common/common'

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
        /**
         * 过渡组件
         */
        transitionalComponent: {
          componentTra: {
            template: '<common-select v-bind:dataSelect="dataSelect"></common-select>',
            props: {
              dataSelect: {
                type: Object,
                required: true
              }
            }
          },
          vue: this.$vue,
          dataSelect: {}
        }
      },
      operaClick: operaClick
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
      this.handle.transitionalComponent.dataSelect = this.$common.parse(resp)
      /**
       * 全局初始化CommonSelect
       */
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
