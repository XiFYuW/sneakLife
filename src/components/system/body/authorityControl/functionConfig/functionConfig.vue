<template>
  <div class="row">
    <div class="col-sm-3 col-md-2 sidebar treeViewMa">
      <div id="treeView"></div>
    </div>
    <div class="col-md-8 sidebar">
      <table id="treeGrid"></table>
    </div>
  </div>
</template>

<script>
import {treeView} from '../../../../../common/treeview'
import {treeGrid} from '../../../../../common/treeGrid'

export default {
  name: 'function-config',
  props: {
    dataUrl: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$http.get(this.dataUrl).then(resp => {
      const options = this.$common.parse(resp)
      treeView.init(this.$jquery, options)
    })
    treeGrid.init(this.$jquery, this.$http, this.$common)
  }
}
</script>

<style scoped>
  .treeViewMa{
    margin-left: 120px;
  }
</style>
