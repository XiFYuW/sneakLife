<template>
  <div id="point">
    <data-table v-bind:opera="opera" v-bind:head="head" v-bind:operaClick="operaClick"
                v-bind:tableId="tableId" v-bind:toolbarId="toolbarId"></data-table>
  </div>
</template>

<script>
import CommonSelect from '../../../../common/commonSelect'
import {dataTable} from '../../../../../common/dataTable'
const AsyncView = require('../../../../../common/common').AsyncView
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
            template: '<common-select v-bind:selectCol="selectCol" v-bind:isMnh="isMnh"></common-select>',
            props: {
              selectCol: {
                type: Object,
                required: true
              },
              isMnh: {
                type: Boolean,
                required: false
              }
            }
          },
          vue: this.$utils.vue,
          selectCol: {},
          isMnh: false
        }
      },
      /**
       * 操作按钮的动作
       */
      operaClick: this.$utils.operaClick,
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
    'data-table': () => AsyncView.lazyLoadViews(import('../../../../common/dataTable'))
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created () {
    this.$central.send(this.$utils.http, {me: 'selectsList', data: {}}).then(resp => {
      this.handle.transitionalComponent.selectCol = resp.respData
      this.handle.transitionalComponent.isMnh = false
      // 全局初始化CommonSelect
      this.$utils.vue.component('common-select', CommonSelect)
    })
  },
  mounted () {
    this.$central.send(this.$utils.http, {me: this.item.pageUrl, data: {menuId: this.item.id}}).then(resp => {
      const data = resp.respData
      this.opera = data.opera
      dataTable.tl.queryParams = params => {
        return dataTable.queryParams(params, this.item.dataUrl, null, this.$central)
      }
      dataTable.tl.responseHandler = resp => {
        return dataTable.responseHandler(resp, this.$central, () => {
          dataTable.refresh(this.tableId, this.$jquery, dataTable.tl)
        })
      }
      dataTable.tl.url = this.$central.url
      dataTable.tl.toolbar = '#' + this.toolbarId
      dataTable.tl.columns = data.table.columns
      dataTable.tl.columns.splice(0, 0, dataTable.checkbox)
      dataTable.tl.columns.push(this.handle.operate)
      let disabled = !this.opera.sb
      dataTable.tl.clickToSelect = false
      dataTable.tl.onLoadSuccess = (data) => {
        dataTable.applySelect(this.$jquery, data, disabled)
      }
      dataTable.setTraCom(this.handle.transitionalComponent)
      dataTable.init(this.tableId, this.$jquery, dataTable.tl)
    })
  },
  updated () {
    this.operaClick.updateTable = (el, $, columns) => {
      let data = $('#' + el).bootstrapTable('getAllSelections')
      if (this.operaClick.hint(data)) {
        let con = []
        for (let v in data) {
          let userId = data[v].userId
          let obj = $('#row' + userId + ' select').find('option:selected').selectpicker('val').get('0')
          let je = {}
          je.value = obj.value
          je.id = data[v].id
          je.userId = userId
          con.push(je)
        }
        this.$central.send(this.$utils.http, {me: this.$utils.url, data: {up: con}}).then(resp => {
          this.$utils.toastr.success(resp.respMsg)
          $('#user-role-config').bootstrapTable('refresh')
        })
      }
    }

    this.operaClick.search = () => {
      let searchData = this.$utils.searchData(this.$jquery, this.opera.bo)
      dataTable.tl.queryParams = params => {
        return dataTable.queryParams(params, this.item.dataUrl, searchData, this.$central)
      }
      dataTable.init(this.tableId, this.$jquery, dataTable.tl)
    }

    this.operaClick.remove = () => {
      this.operaClick.operaInEach(this.opera.bo, null, (v, index, item, data) => {
        this.$utils.clearAll(this.$jquery, v)
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

<style scoped>
</style>
