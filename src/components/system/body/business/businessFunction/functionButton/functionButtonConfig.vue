<template>
  <div class="row">
    <div class="col-sm-2 col-md-2 sidebar treeViewMa">
      <tree-view></tree-view>
    </div>
    <div class="col-md-9 sidebar" v-if="isShowData">
      <data-table v-bind:opera="opera" v-bind:head="head" v-bind:operaClick="operaClick"
                  v-bind:tableId="tableId" v-bind:toolbarId="toolbarId"></data-table>
    </div>
  </div>
</template>

<script>
import {treeView} from '../../../../../../common/treeview'
import {operaClick} from '../../../../../../common/common'
import {dataTable} from '../../../../../../common/dataTable'
import {selects} from '../../../../../../common/selects'
const treeViewCopy = require('../../../../../../common/common').deepCopy.deepCopy(treeView)
const operaClickCopy = require('../../../../../../common/common').deepCopy.deepCopy(operaClick)
const dataTableCopy = require('../../../../../../common/common').deepCopy.deepCopy(dataTable)
export default {
  name: 'function-button-config',
  components: {
    'tree-view': () => import('../../../../../common/treeView'),
    'data-table': () => import('../../../../../common/dataTable')
  },
  data () {
    return {
      operaClick: operaClickCopy,
      opera: {},
      head: this.item.tab,
      isShowData: false,
      tableId: 'function-button-config',
      toolbarId: 'function-button-config-toolbar',
      menuIdTemp: ''
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.$central.send(this.$utils.http, {me: this.item.pageUrl, data: {menuId: this.item.id}}).then(resp => {
      let $ = this.$jquery
      treeViewCopy.options.data = resp.respData
      treeViewCopy.init($)
      treeViewCopy.nodeSelected($, (event, data) => {
        this.isShowData = true
        if (data.url !== '#') {
          this.$central.send(this.$utils.http, {me: data.url, data: {menuId: this.item.id}}).then(resp => {
            const initDataTable = resp.respData
            this.head = this.item.tab + ' - ' + data.text
            this.opera = initDataTable.opera
            this.menuIdTemp = data.id
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
                },
                data: {menuId: this.menuIdTemp, name: data.text}
              }
              return {data: this.$central.enParameter(parameter)}
            }
            dataTableCopy.tl.url = this.$central.url
            dataTableCopy.tl.toolbar = '#' + this.toolbarId
            dataTableCopy.tl.responseHandler = resp => {
              if (!this.$utils.central.checkCode(resp)) {
                return
              }
              return {
                total: resp.respData.totalElements,
                rows: resp.respData.content
              }
            }
            dataTableCopy.tl.columns = initDataTable.table.columns
            dataTableCopy.tl.columns.splice(0, 0, {
              'checkbox': true,
              'data-halign': 'center'
            })
            dataTableCopy.init(this.tableId, this.$jquery, dataTableCopy.tl)
          })
        }
      })
    })
  },
  updated () {
    this.operaClick.addTable = (el, $, columns) => {
      this.$utils.central.send(this.$utils.http, {me: 'getByType', data: {type: '35,32,65'}}).then(resp => {
        let selectData = resp.respData.data
        columns.forEach(item => {
          item.forEach((v, index) => {
            v.value = ''
            let data = selectData[v.field]
            if (data) {
              this.$utils.vue.set(v, v.field + 'SelectData', data)
            }
            v.menuIdTemp = this.menuIdTemp
            item.splice(index, index + 1, v)
          })
        })
        this.$utils.modalFrame.show($)
      })
    }

    this.operaClick.updateTable = (el, $, columns) => {
      this.$utils.central.send(this.$utils.http, {me: 'getByType', data: {type: '35,32,65'}}).then(resp => {
        let selectData = resp.respData.data
        let data = $('#' + el).bootstrapTable('getAllSelections')
        if (this.operaClick.hint(data)) {
          this.$utils.setId(data[0].id)
          // 传入子组件的值
          columns.forEach(item => {
            item.forEach((v, index) => {
              let key = v.field
              // 对应key,增加value属性
              for (let i = 0; i < data.length; i++) {
                let jsons = data[i]
                for (let p in jsons) {
                  if (key === p) {
                    let td = selectData[key]
                    if (td) {
                      this.$utils.vue.set(v, key + 'SelectData', td)
                      let obj = $('#' + v.id)
                      for (let va in td) {
                        if (td[va].name === jsons[p]) {
                          selects.setVal(obj, td[va].value)
                        }
                      }
                    } else {
                      this.$utils.vue.set(v, 'value', jsons[p])
                    }
                  }
                }
              }
            })
          })
          this.$utils.modalFrame.show($)
        }
      })
    }
  }
}
</script>

<style scoped>
  .treeViewMa{
    margin-left: 60px;
    width: max-content;
  }
</style>
