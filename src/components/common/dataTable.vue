<template>
  <div class="container">
    <div class="panel panel-default">
      <div class="panel-heading" v-if="head">{{head}}</div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-4">
            <div class="input-group">
              <span class="input-group-addon" id="sizing-addon1">@</span>
              <input type="text" class="form-control" placeholder="Username" aria-describedby="sizing-addon1">
            </div>
          </div>
          <div class="col-md-4">
            <date-time-picker></date-time-picker>
          </div>
        </div>
        <div class="btn-group" role="group" id="toolbar" v-if="opera">
          <button class="btn btn-default" v-bind:class="item.text" v-bind:key="item.text" v-bind:type="item.type"
                  v-for="item in opera.sb" v-on:click="selectMe(item.code, item.text)">
            <span class="glyphicon" v-bind:class="item.icon" aria-hidden="true"></span> {{item.text}}
          </button>
        </div>
      </div>
      <table class="table" id="table"></table>
    </div>
    <div v-if="opera">
      <modal-frame v-bind:funIn="opera.in"></modal-frame>
    </div>
  </div>
</template>
<script>
export default {
  name: 'data-table',
  components: {
    'modal-frame': () => import('./modalFrame'),
    'date-time-picker': () => import('./dateTimePicker')
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
    selectMe: function (code, text) {
      this.operaClick.selectClickMe(code, 'table', this.$jquery, text, this.opera.in)
    }
  }
}
</script>
