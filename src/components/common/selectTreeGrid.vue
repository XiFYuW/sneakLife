<template>
  <div class="input-group">
    <span class="input-group-addon" id="sizing-addon2">下拉数据树形表格</span>
    <input id="dt" type="text" autocomplete="off" class="form-control selectDataGridView-input"
           v-on:click="showDataGridView" aria-describedby="sizing-addon2" tabindex="2">
    <div id="select-tree-grid" class="selectDataGridView">
      <div class="panel panel-default">
        <div class="panel-heading" v-if="head">{{head}}</div>
        <div class="panel-body"></div>
        <table id="select-tree-grids"></table>
      </div>
    </div>
  </div>
</template>

<script>
import {treeGrid} from '../../common/treeGrid'
const treeGridCopy = require('../../common/common').deepCopy.deepCopy(treeGrid)
export default {
  name: 'select-tree-grid',
  data () {
    return {
      head: ''
    }
  },
  mounted () {
    this.$http.get('static/json/common/selectTreeGrid/roleFunctionConfig.json').then(resp => {
      const data = this.$utils.parse(resp)
      this.head = data.head
      data.table.columns[0].formatter = treeGridCopy.defalut.checkFormatter
      data.table.columns[2].formatter = treeGridCopy.defalut.stutsFormatter
      treeGridCopy.tl.columns = data.table.columns
      treeGridCopy.tl.url = data.table.url
      treeGridCopy.tl.pagination = true
      treeGridCopy.init(this.$jquery, 'select-tree-grids')
    })

    this.$jquery('#select-tree-grid').mouseleave(() => {
      this.$jquery('#select-tree-grid').hide()
    })
  },
  methods: {
    showDataGridView: function () {
      const $ = this.$jquery
      let obj = $('#select-tree-grid')
      obj.show()
      obj.on('click-row.bs.table', function (e, row, $element, field) {
        $('#dt').val(row.name)
        obj.hide()
      })
    }
  }
}
</script>

<style scoped>
  .selectDataGridView{
    display: none;
    position:absolute;
    z-index:1010;
    background-color:white;
    margin-top:34px;
    width: 500px
  }
  .selectDataGridView-input{
    width: 250px;
    height: 34px;
    margin-left: 0;
    margin-bottom: 0;
  }
</style>
