<template>
  <div id="point">
    <data-table v-bind:opera="opera" v-bind:head="head" v-bind:operaClick="operaClick"
                v-bind:tableId="tableId" v-bind:toolbarId="toolbarId"></data-table>
  </div>
</template>

<script>
import CommonSelect from '../../../../common/commonSelect'
import {operaClick} from '../../../../../common/common'
import {dataTable} from '../../../../../common/dataTable'
const operaClickCopy = require('../../../../../common/common').deepCopy.deepCopy(operaClick)
const dataTableCopy = require('../../../../../common/common').deepCopy.deepCopy(dataTable)
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
            let id = 'row' + row.userId
            let ids = 'rows' + row.userId
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
      head: this.item.tab,
      tableId: 'user-role-config',
      toolbarId: 'user-role-config-toolbar'
    }
  },
  components: {
    'data-table': () => import('../../../../common/dataTable')
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.$utils.central.send(this.$utils.http, {me: 'selectsList', data: {}}).then(resp => {
      this.handle.transitionalComponent.dataSelect = resp.respData
      /**
         * 全局初始化CommonSelect
         */
      this.$vue.component('common-select', CommonSelect)
    })
    let $ = this.$jquery
    this.$utils.central.send(this.$utils.http, {me: this.item.pageUrl, data: {menuId: this.item.id}}).then(resp => {
      const data = resp.respData
      this.opera = data.opera
      dataTableCopy.tl.queryParams = params => {
        let parameter = {
          me: this.item.dataUrl,
          pag: {
            // 页面大小
            rows: params.limit,
            // 页码
            page: params.offset / params.limit,
            // 排序列名
            sort: params.sort,
            // 排序命令（desc，asc）
            sortOrder: params.order
          }
        }
        return {data: this.$central.enParameter(parameter)}
      }
      dataTableCopy.tl.responseHandler = resp => {
        return {
          total: resp.respData.totalElements,
          rows: resp.respData.content
        }
      }
      dataTableCopy.tl.url = this.$central.url
      dataTableCopy.tl.toolbar = '#' + this.toolbarId
      dataTableCopy.tl.columns = data.table.columns
      dataTableCopy.tl.columns.splice(0, 0, {
        'checkbox': true,
        'data-halign': 'center'
      })
      dataTableCopy.tl.columns.push(this.handle.operate)
      let disabled = !this.opera.sb
      dataTableCopy.tl.clickToSelect = false
      dataTableCopy.tl.onLoadSuccess = function (data) {
        dataTableCopy.applySelect($, data, disabled)
      }
      dataTableCopy.setTraCom(this.handle.transitionalComponent)
      dataTableCopy.init(this.tableId, $, dataTableCopy.tl)
    })
    this.operaClick.updateTable = (el, $, columns) => {
      let data = $('#' + el).bootstrapTable('getAllSelections')
      for (let v in data) {
        let obj = $('#row' + data[v].userId + ' select').find('option:selected').selectpicker('val').get('0')
        data[v].value = obj.value
        data[v].text = obj.text
      }
      this.$utils.central.send(this.$utils.http, {me: this.$utils.url, data: {up: data}}).then(resp => {
        this.$utils.toastr.success(resp.respMsg)
        $('#user-role-config').bootstrapTable('refresh')
      })
    }
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

<style>
  .select-padd{
    padding: 0;
  }
</style>
