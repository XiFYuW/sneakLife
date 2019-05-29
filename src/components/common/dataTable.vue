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
      <modal-frame v-bind:funIn="opera.funIn"></modal-frame>
    </div>
  </div>
</template>
<script>
import {bootstrapTable} from '../../common/bootstrapTable'

export default {
  name: 'data-table',
  data () {
    return {
      opera: {},
      head: ''
    }
  },
  components: {
    'modal-frame': () => import('./modalFrame')
  },
  props: {
    dataUrl: {
      type: String,
      required: true
    },
    handle: {
      type: Object,
      required: false
    },
    operaClick: {
      type: Object,
      required: false
    }
  },
  mounted () {
    let $ = this.$jquery
    this.$http.get(this.dataUrl).then(resp => {
      const body = this.$common.parse(resp)
      this.opera = body.opera
      this.head = body.head
      if (this.handle) {
        body.dataTables.clo.push(this.handle.operate)
        let disabled = !this.opera.funBtn
        bootstrapTable.tl.onLoadSuccess = function (data) {
          bootstrapTable.applySelect($, data, disabled)
        }
        bootstrapTable.setTraCom(this.handle.transitionalComponent)
      }
      bootstrapTable.init('table', $, body.dataTables, bootstrapTable.tl)
    })
  },
  methods: {
    /**
     * 灾区
     */
    selectMe: function (code, text) {
      if (this.head === 'UserRoleConfig') {
        this.operaClick.updateTable = function (el, $, pop, upData) {
          console.log($('#' + el).bootstrapTable('getAllSelections'))
        }
      }
      this.operaClick.selectClickMe(code, 'table', this.$jquery, text, this.opera.funIn)
    }
  }
}
</script>
