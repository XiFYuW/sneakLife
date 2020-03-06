<template>
  <div class="row suitable" style="width: 100%">
    <div class="col-sm-2 col-md-2 sidebar treeViewMa">
      <tree-view v-bind:id="roleList"></tree-view>
    </div>
    <div class="col-sm-2 col-md-2 sidebar treeViewMa">
      <div class="btn-group-sm" role="group" v-if="isSave">
        <button type="button" class="btn btn-default btn-bc" v-on:click="onSave">
          <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
          <span class="font"> 保存</span>
        </button>
      </div>
      <tree-view v-bind:id="operaList"></tree-view>
    </div>
    <div class="col-sm-7 col-md-7 sidebar" style="display: flex" v-if="isOperaList">
      <data-table v-bind:opera="opera" v-bind:head="head" v-bind:operaClick="operaClick"
                  v-bind:tableId="tableId" v-bind:toolbarId="toolbarId"></data-table>
    </div>
  </div>
</template>

<script>
import {treeGrid} from '../../../../../common/treeGrid'
const AsyncView = require('../../../../../common/common').AsyncView
export default {
  name: 'role-function-config1',
  components: {
    'tree-view': () => AsyncView.lazyLoadViews(import('../../../../common/treeView')),
    'tree-grid': () => AsyncView.lazyLoadViews(import('../../../../common/treeGrid')),
    'data-table': () => AsyncView.lazyLoadViews(import('../../../../common/dataTable'))
  },
  data () {
    return {
      operaClick: this.$utils.operaClick,
      opera: {},
      head: this.item.tab,
      tableId: 'role-function-config-table',
      toolbarId: 'role-function-config-toolbar',
      roleList: 'roleList' + this.item.id,
      operaList: 'operaList' + this.item.id,
      roleId: '',
      erMenuId: '',
      isOperaList: false,
      isSave: false
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  mounted () {
    let $ = this.$jquery
    let http = this.$utils.http
    this.$central.send(http, {me: this.item.pageUrl, data: {}}).then(resp => {
      this.$utils.selectsTree.options.data = resp.respData
      this.$utils.selectsTree.init(this.$jquery, this.roleList)
      this.$utils.selectsTree.nodeSelected(this.$jquery, (event, data) => {
        if (data.url !== '#') {
          this.isSave = true
          this.isOperaList = false
          this.roleId = data.id
          this.$central.send(http, {me: data.url, data: {menuId: this.item.id, roleId: this.roleId}}).then(resp => {
            let operaListTree = this.$utils.getSelectsTree()
            operaListTree.options.data = resp.respData
            operaListTree.options.showCheckbox = true
            operaListTree.init(this.$jquery, this.operaList)
            operaListTree.nodeSelected(this.$jquery, (event, data) => {
              if (data.url !== '#') {
                this.erMenuId = data.id
                this.isOperaList = true
                this.$central.send(http, {me: data.url, data: {menuId: this.item.id}}).then(resp => {
                  const initDataTable = resp.respData
                  this.head = this.item.tab
                  this.opera = initDataTable.opera
                  initDataTable.table.columns.splice(0, 0, treeGrid.checkbox)
                  initDataTable.table.columns[0].formatter = treeGrid.defalut.checkFormatter
                  treeGrid.tl.columns = initDataTable.table.columns
                  treeGrid.tl.toolbar = '#' + this.toolbarId
                  treeGrid.tl.url = this.$central.url
                  treeGrid.tl.queryParams = params => {
                    return treeGrid.queryParams(params, this.item.dataUrl, {menuId: data.id, roleId: this.roleId}, this.$central)
                  }
                  treeGrid.tl.responseHandler = resp => {
                    return treeGrid.responseHandler(resp, this.$central, () => {
                      treeGrid.init($, this.tableId)
                    })
                  }
                  treeGrid.init($, this.tableId)
                })
              }
            })
          })
        }
      })
    })

    this.operaClick.updateTable = (el, $, columns) => {
      let obj = $('#' + this.tableId)
      let pageData = obj.bootstrapTable('getAllSelections')
      let arr = []
      pageData.forEach(e => {
        arr.push(e.treeViewId)
      })
      this.$central.send(this.$utils.http, {me: this.$utils.url, data: {up: arr, roleId: this.roleId, erMenuId: this.erMenuId}}).then(resp => {
        this.$central.toastr.success(resp.respMsg)
        obj.bootstrapTable('refresh')
      })
    }
  },
  methods: {
    onSave: function () {
      let t = this.$utils.selectsTree.getChecked(this.$jquery('#' + this.operaList))
      let arr = []
      t.forEach(x => {
        arr.push(x.id)
      })
      this.$central.send(this.$utils.http, {me: 'updateRoleFunction', data: {up: arr, roleId: this.roleId}}).then(resp => {
        this.$central.toastr.success(resp.respMsg)
      })
    }
  }
}
</script>

<style scoped src="./../../../../../css/treeViewMa.css">
</style>
