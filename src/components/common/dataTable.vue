<template>
  <div class="container">
    <div class="panel panel-default">
      <div class="panel-heading" v-if="head">{{head}}</div>
      <div class="panel-body operaBo" v-if="opera.bo !== undefined && opera.bo.length > 0">
          <div class="row rowPadd" v-for="(item, index) in opera.bo" v-bind:key="index">
            <div class="col-md-4" v-for="(items, cindex) in item" v-bind:key="cindex">
              <input-text v-bind:inputText="items" v-if="items.htmlType === 'inputText'"></input-text>
              <common-select v-bind:selectCol="items" v-bind:isMnh="true" v-bind:isSpan="true" v-else-if="items.htmlType === 'selects'"></common-select>
              <date-time-picker v-bind:picker="items" v-bind:isRange="true" v-else-if="items.htmlType === 'dateTimePicker'"></date-time-picker>
              <select-tree-view v-bind:treeView="items" v-bind:isSpan="true" v-else></select-tree-view>
            </div>
          </div>
        <!--<idv>-->
          <!--<div class="row rowPadd">-->
            <!--<div class="col-md-4">-->
              <!--<select-data-table></select-data-table>-->
            <!--</div>-->
            <!--<div class="col-md-4">-->
              <!--<select-tree-grid></select-tree-grid>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
      <div class="btn-group" role="group" :id="toolbarId">
        <div class="btn-a" v-if="opera.bo !== undefined && opera.bo.length > 0">
          <button class="btn btn-default" v-on:click="search()">
            <span class="glyphicon glyphicon-search" aria-hidden="true"></span> 查询
          </button>
          <button class="btn btn-default" v-on:click="remove()">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> 重置
          </button>
        </div>
        <div class="btn-b">
          <button class="btn btn-default" v-bind:class="item.code" v-bind:key="item.code" v-bind:type="item.type"
                  v-for="item in opera.sb" v-on:click="selectMe(item.code, item.url, item.codeName)">
            <span class="glyphicon" v-bind:class="item.icon" aria-hidden="true"></span> {{item.codeName}}
          </button>
        </div>
      </div>
      <table class="table" :id="tableId"></table>
    </div>
    <div>
      <modal-frame v-bind:funIn="opera.in" v-bind:btnUrl="btnUrl" v-bind:modalFrameTitle="modalFrameTitle"></modal-frame>
    </div>
  </div>
</template>
<script>
export default {
  name: 'data-table',
  data () {
    return {
      btnUrl: '',
      modalFrameTitle: ''
    }
  },
  components: {
    'modal-frame': () => import('./modalFrame'),
    'common-select': () => import('./commonSelect'),
    'date-time-picker': () => import('./dateTimePicker'),
    'select-tree-view': () => import('./selectTreeView'),
    'select-data-table': () => import('./selectDataTable'),
    'select-tree-grid': () => import('./selectTreeGrid'),
    'input-text': () => import('./inputText')
  },
  props: {
    toolbarId: {
      type: String,
      required: true
    },
    tableId: {
      type: String,
      required: true
    },
    /**
     * 功能按钮
     */
    opera: {
      type: Object,
      required: true
    },
    /**
     * 标题头
     */
    head: {
      type: String,
      required: false
    },
    /***
     * 数据表格操作列
     */
    handle: {
      type: Object,
      required: false
    },
    /**
     * 操作按钮的动作
     */
    operaClick: {
      type: Object,
      required: false
    }
  },
  methods: {
    selectMe: function (code, url, name) {
      this.modalFrameTitle = this.head + '-' + name
      // 设置具体请求地址
      this.btnUrl = url
      this.$utils.setUrl(url)
      this.operaClick.selectClickMe(code, this.tableId, this.$jquery, this.opera.in)
    },
    search: function () {
      this.operaClick.search()
    },
    remove: function () {
      this.operaClick.remove()
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
  .operaBo{
    padding: unset;
  }
  .rowPadd{
    padding: 10px;
  }
</style>
