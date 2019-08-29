<template>
  <div id="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="gridSystemModalLabel">Modal title</h4>
        </div>
        <div class="modal-body">
          <form>
            <div class="row" v-for="(item, index) in funIn" v-bind:key="index">
              <div class="col-lg-6" v-for="(items, cindex) in item" v-bind:key="cindex">
                <input-label v-bind:inputLable="items" v-bind:isSpan="false" v-if="items.htmlType === 'inputLable'"></input-label>
                <common-select v-bind:dataSelect="items" v-bind:isSpan="false" v-else-if="items.htmlType === 'selects'"></common-select>
                <select-tree-view v-bind:treeView="items" v-bind:isSpan="false" v-else></select-tree-view>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" v-on:click="send()">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {selects} from '../../common/selects'
export default {
  name: 'modal-frame',
  props: {
    funIn: {
      type: Array,
      redirect: true
    },
    btnUrl: {
      type: String,
      redirect: true
    }
  },
  components: {
    'common-select': () => import('./commonSelect'),
    'date-time-picker': () => import('./dateTimePicker'),
    'select-tree-view': () => import('./selectTreeView'),
    'select-data-table': () => import('./selectDataTable'),
    'select-tree-grid': () => import('./selectTreeGrid'),
    'input-text': () => import('./inputText'),
    'input-label': () => import('./inputLabel')
  },
  methods: {
    send: function () {
      let code = this.$utils.code
      if (code === '0' || code === '1') {
        let data = this.dispColumnsNull()
        if (code === '1') {
          data.id = this.$utils.id
        }
        if (this.$utils.getObjLength(data) > 0) {
          this.toSend(data)
        }
      }
    },
    dispColumnsNull: function () {
      let $ = this.$jquery
      let data = {}
      for (let i = 0; i < this.funIn.length; i++) {
        let arr = this.funIn[i]
        for (let j = 0; j < arr.length; j++) {
          let obj = arr[j]
          data = this.getByHtmlType($, obj, data)
          if (obj.hasOwnProperty('menuIdTemp')) {
            data = this.$utils.toObj(data, 'menuIdTemp', obj.menuIdTemp)
          }
        }
      }
      debugger
      return data
    },
    getByHtmlType: function ($, item, data) {
      let v = null
      let obj = $('#' + item.id)
      switch (item.htmlType) {
        case 'inputLable':
          v = obj.val()
          break
        case 'treeView':
          let temp = this.$utils.selectTreeViewData
          if (temp !== null && temp !== undefined) {
            v = temp.value
            if (temp.hasOwnProperty('tempMenuId')) {
              data = this.$utils.toObj(data, 'tempMenuId', temp.tempMenuId)
            } else {
              data = this.$utils.toObj(data, 'tempMenuId', v)
            }
          }
          break
        case 'selects':
          v = selects.getVal(obj)
          break
        default:
          break
      }
      if (v === '' || undefined === v) {
        this.$utils.toastr.warning(item.textName + '不能为空')
        return {}
      }
      data = this.$utils.toObj(data, item.field, v)
      return data
    },
    toSend: function (data) {
      this.$utils.central.send(this.$utils.http, {me: this.btnUrl, data: data}).then(resp => {
        this.$utils.modalFrame.hide(this.$jquery)
        this.$jquery('#' + this.$utils.table).bootstrapTable('refresh')
        this.$utils.central.toastr.success(resp.respMsg)
      })
    }
  },
  watch: {
    funIn: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.funIn = newVal
        }
      }
    },
    btnUrl: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.btnUrl = newVal
        }
      }
    },
    deep: true
  }
}
</script>

<style scoped>
</style>
