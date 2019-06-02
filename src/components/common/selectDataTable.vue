<template>
  <div class="input-group">
    <span class="input-group-addon" id="sizing-addon2">下拉数据表格</span>
    <input id="dt" type="text" autocomplete="off" class="form-control selectDataTableView-input"
           v-on:click="showDataTableView" aria-describedby="sizing-addon2" tabindex="2">
    <div id="select-data-table" class="selectDataTableView">
      <div class="panel panel-default">
        <div class="panel-heading" v-if="head">{{head}}</div>
        <div class="panel-body">
          <div class="btn-group" role="group" id="toolbars">
            <button class="btn btn-default" v-bind:class="item.text" v-bind:key="item.text" v-bind:type="item.type"
                    v-for="item in operas.sb" v-on:click="selectMe(item.code, item.text)">
              <span class="glyphicon" v-bind:class="item.icon" aria-hidden="true"></span> {{item.text}}
            </button>
          </div>
        </div>
        <table class="table" id="select-data-tables"></table>
      </div>
    </div>
  </div>
</template>

<script>
import {dataTable} from '../../common/dataTable'
const dataTableCopy = require('../../common/common').deepCopy.deepCopy(dataTable)
export default {
  name: 'select-data-table',
  components: {
    'data-table': () => import('./dataTable')
  },
  data () {
    return {
      head: '',
      operas: {}
    }
  },
  mounted () {
    let $ = this.$jquery

    this.$http.get('static/json/common/selectDataTable/selectDataTable.json').then(resp => {
      const data = this.$utils.parse(resp)
      this.head = data.head
      dataTableCopy.tl.toolbar = '#toolbars'
      dataTableCopy.init('select-data-tables', $, data.table, dataTableCopy.tl)
    })

    $('#select-data-table').mouseleave(() => {
      $('#select-data-table').hide()
    })
  },
  methods: {
    showDataTableView: function () {
      let obj = this.$jquery('#select-data-table')
      obj.show()
      obj.on('click-row.bs.table', (e, row, $element, field) => {
        this.$jquery('#dt').val(row.name)
        obj.hide()
      })
    }
  }
}
</script>

<style scoped>
  .selectDataTableView{
    display: none;
    position:absolute;
    z-index:1010;
    background-color:white;
    margin-top:34px;
    width: 500px
  }
  .selectDataTableView-input{
    width: 250px;
    height: 34px;
    margin-left: 0;
    margin-bottom: 0;
  }
</style>
