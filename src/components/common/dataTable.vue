<template>
  <div class="container">
    <div class="panel panel-default">
      <div class="panel-heading" v-if="head">{{head}}</div>
      <div class="panel-body operaBod">
        <div>
          <div class="row rowPadd">
            <div class="col-md-4">
              <input-text></input-text>
            </div>
            <div class="col-md-4">
              <date-time-picker></date-time-picker>
            </div>
            <div class="col-md-4">
              <select-tree-view></select-tree-view>
            </div>
          </div>
          <div class="row rowPadd">
            <div class="col-md-4">
              <select-data-table></select-data-table>
            </div>
            <div class="col-md-4">
              <select-tree-grid></select-tree-grid>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-group" role="group" id="toolbar">
        <button class="btn btn-default" v-bind:class="item.text" v-bind:key="item.text" v-bind:type="item.type"
                v-for="item in opera.sb" v-on:click="selectMe(item.code, item.text, item.url)">
          <span class="glyphicon" v-bind:class="item.icon" aria-hidden="true"></span> {{item.text}}
        </button>
      </div>
      <table class="table" id="table"></table>
    </div>
    <div>
      <modal-frame v-bind:funIn="opera.in" v-bind:btnUrl="btnUrl"></modal-frame>
    </div>
  </div>
</template>
<script>
export default {
  name: 'data-table',
  data () {
    return {
      btnUrl: ''
    }
  },
  components: {
    'modal-frame': () => import('./modalFrame'),
    'date-time-picker': () => import('./dateTimePicker'),
    'select-tree-view': () => import('./selectTreeView'),
    'select-data-table': () => import('./selectDataTable'),
    'select-tree-grid': () => import('./selectTreeGrid'),
    'input-text': () => import('./inputText')
  },
  props: {
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
    selectMe: function (code, text, url) {
      this.btnUrl = url
      this.$utils.setUrl(url)
      this.operaClick.selectClickMe(code, 'table', this.$jquery, text, this.opera.in)
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
  .operaBod{
    padding: unset;
  }
  .rowPadd{
    padding: 10px;
  }
</style>
