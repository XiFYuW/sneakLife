<template>
  <div id="point">
    <data-table v-bind:initDataTable="initDataTable" v-bind:handle="handle" v-bind:operaClick="operaClick"></data-table>
  </div>
</template>

<script>
import CommonSelect from '../../../../common/commonSelect'
import {operaClick} from '../../../../../common/common'
import {bootstrapTable} from '../../../../../common/bootstrapTable'

export default {
  name: 'user-role-config',
  data () {
    return {
      /**
       * 操作列
       */
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
      operaClick: operaClick,
      initDataTable: {}
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
  mounted () {
    this.$http.get('static/json/system/body/AuthorityControl/userRoleConfig/selects.json').then(resp => {
      this.handle.transitionalComponent.dataSelect = this.$common.parse(resp)
      /**
       * 全局初始化CommonSelect
       */
      this.$vue.component('common-select', CommonSelect)
    })
    let $ = this.$jquery
    let common = this.$common
    this.$http.get(this.dataUrl).then(resp => {
      this.initDataTable = common.parse(resp)
      this.initDataTable.table.columns.push(this.handle.operate)
      let disabled = !this.initDataTable.opera.sb
      bootstrapTable.tl.clickToSelect = false
      bootstrapTable.tl.onLoadSuccess = function (data) {
        bootstrapTable.applySelect($, data, disabled)
      }
      bootstrapTable.setTraCom(this.handle.transitionalComponent)
      bootstrapTable.init('table', $, this.initDataTable.table, bootstrapTable.tl)
    })

    /**
     * 保存操作
     * @param el
     * @param $
     * @param pop
     */
    this.operaClick.updateTable = function (el, $, pop) {
      let data = $('#' + el).bootstrapTable('getAllSelections')
      for (let v in data) {
        let obj = $('#row' + data[v].id + ' select').find('option:selected').selectpicker('val').get('0')
        data[v].value = obj.value
        data[v].text = obj.text
      }
    }
  }
}
</script>

<style>
  .select-padd{
    padding: 0;
  }
</style>
