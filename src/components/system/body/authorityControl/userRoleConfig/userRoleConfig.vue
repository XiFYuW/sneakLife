<template>
  <div id="point">
    <data-table v-bind:opera="opera" v-bind:head="head" v-bind:handle="handle" v-bind:operaClick="operaClick"></data-table>
  </div>
</template>

<script>
import CommonSelect from '../../../../common/commonSelect'
import {operaClickCopy} from '../../../../../common/common'
import {dataTableCopy} from '../../../../../common/dataTable'

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
  props: {
    dataUrl: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$http.get('static/json/system/body/AuthorityControl/userRoleConfig/selects.json').then(resp => {
      this.handle.transitionalComponent.dataSelect = this.$utils.parse(resp)
      /**
       * 全局初始化CommonSelect
       */
      this.$vue.component('common-select', CommonSelect)
    })
    let $ = this.$jquery
    this.$http.get(this.dataUrl).then(resp => {
      const initDataTable = this.$utils.parse(resp)
      this.opera = initDataTable.opera
      this.head = initDataTable.head
      initDataTable.table.columns.push(this.handle.operate)
      let disabled = !initDataTable.opera.sb
      dataTableCopy.tl.clickToSelect = false
      dataTableCopy.tl.onLoadSuccess = function (data) {
        dataTableCopy.applySelect($, data, disabled)
      }
      dataTableCopy.setTraCom(this.handle.transitionalComponent)
      dataTableCopy.init('table', $, initDataTable.table, dataTableCopy.tl)
    })

    /**
     * 保存操作
     * @param el
     * @param $
     * @param pop
     */
    this.operaClick.updateTable = function (el, $, pop) {
      let data = $('#' + el).dataTable('getAllSelections')
      for (let v in data) {
        let obj = $('#row' + data[v].id + ' select').find('option:selected').selectpicker('val').get('0')
        data[v].value = obj.value
        data[v].text = obj.text
      }
      console.log(data)
    }
  }
}
</script>

<style>
  .select-padd{
    padding: 0;
  }
</style>
