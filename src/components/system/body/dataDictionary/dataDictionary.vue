<template>
  <div class="container">
    <div class="panel panel-default">
      <div class="panel-heading" v-if="head">{{head}}</div>
      <div class="panel-body">
        <div class="btn-group" role="group" id="toolbar">
          <button class="btn btn-default" v-bind:class="item.text" v-bind:key="item.text" v-bind:type="item.type"
                  v-for="item in opera.funBtn" v-on:click="selectMe(item.code, item.text)">
            <span class="glyphicon" v-bind:class="item.icon" aria-hidden="true"></span> {{item.text}}
          </button>
        </div>
      </div>
      <table class="table" id="table"></table>
    </div>
    <div>
      <function-modal v-bind:funIn="opera.funIn"></function-modal>
    </div>
  </div>
</template>
<script>
import {bootstrapTable} from '../../../../common/bootstrapTable'
export default {
  name: 'data-dictionary',
  data () {
    return {
      opera: {},
      head: {}
    }
  },
  components: {
    'function-modal': () => import('./functionModal')
  },
  props: {
    dataUrl: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$http.get(this.dataUrl).then(resp => {
      const body = this.$common.parse(resp)
      this.opera = body.opera
      this.head = body.head
      bootstrapTable.bootstrapTable('table', this.$jquery, body.dataTables)
    })
  },
  methods: {
    selectMe: function (code, text) {
      this.$common.selectClickMe(code, 'table', this.$jquery, text, this.opera.funIn)
    }
  }
}
</script>
