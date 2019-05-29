<template>
  <div class="container">
    <div class="panel panel-default">
      <div class="panel-heading" v-if="initDataTable.head">{{initDataTable.head}}</div>
      <div class="panel-body">
        <div class="btn-group" role="group" id="toolbar" v-if="initDataTable.opera.sb">
          <button class="btn btn-default" v-bind:class="item.text" v-bind:key="item.text" v-bind:type="item.type"
                  v-for="item in initDataTable.opera.sb" v-on:click="selectMe(item.code, item.text)">
            <span class="glyphicon" v-bind:class="item.icon" aria-hidden="true"></span> {{item.text}}
          </button>
        </div>
      </div>
      <table class="table" id="table"></table>
    </div>
    <div>
      <modal-frame v-bind:funIn="initDataTable.opera.funIn"></modal-frame>
    </div>
  </div>
</template>
<script>
export default {
  name: 'data-table',
  components: {
    'modal-frame': () => import('./modalFrame')
  },
  props: {
    initDataTable: {
      type: Object,
      required: true
    },
    /***
     * 操作列
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
  mounted () {
    // this.opera = this.initDataTable.opera
    // this.head = this.initDataTable.head
  },
  methods: {
    selectMe: function (code, text) {
      this.operaClick.selectClickMe(code, 'table', this.$jquery, text, this.opera.funIn)
    }
  },
  watch: {
    initDataTable: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.initDataTable = newVal
        }
      }
    },
    immediate: true,
    deep: true
  }
}
</script>
