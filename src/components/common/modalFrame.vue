<template>
  <div id="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="gridSystemModalLabel">{{modalFrameTitle}}</h4>
        </div>
        <div class="modal-body">
          <form>
            <div class="row" v-for="(item, index) in funIn" v-bind:key="index">
              <div class="col-lg-6" v-for="(items, cindex) in item" v-bind:key="cindex">
                <input-label v-bind:inputLable="items" v-if="items.htmlType === 'inputLable'"></input-label>
                <common-select v-bind:selectCol="items" v-bind:isMnh="true" v-bind:isSpan="false" v-else-if="items.htmlType === 'selects'"></common-select>
                <select-tree-view v-bind:treeView="items" v-bind:isSpan="false" v-else></select-tree-view>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary" v-on:click="send()">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    },
    modalFrameTitle: {
      type: String,
      redirect: false
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
        let data = this.disColumnsNull()
        if (this.$utils.getObjLength(data) > 0) {
          if (code === '1') {
            data.id = this.$utils.id
          }
          this.toSend(data)
        }
      }
    },
    disColumnsNull: function () {
      let $ = this.$jquery
      let obj = {}
      this.$utils.operaClick.operaInEach(this.funIn, null, (v, index, item, data) => {
        obj = this.getByHtmlType($, v, obj)
        if (v.hasOwnProperty('menuIdTemp')) {
          obj = this.$utils.addObjProperty(obj, 'menuIdTemp', v.menuIdTemp)
        }
      })
      return obj
    },
    getByHtmlType: function ($, item, data) {
      let obj = $('#' + item.id)
      let v = this.$utils.switchTtmlTypeValue(obj, item.htmlType)
      // 添加请求参数
      data = this.$utils.addObjProperty(data, item.field, v)
      return data
    },
    toSend: function (data) {
      this.$utils.central.send(this.$utils.http, {checkInId: this.funIn[0][0].menuId, me: this.btnUrl, data: data}).then(resp => {
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
