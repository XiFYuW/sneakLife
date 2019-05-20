<template>
  <div>
    <div class="container-fluid">
      <div class="col-sm-3 col-md-2 sidebar">
        <div id="treeView"></div>
      </div>
    </div>
    <div class="container">
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
      // treeView.init(this.$jquery, options)
    })
    treeGrid.init(this.$jquery, this.$http, this.$common)
  }
}
</script>

<style scoped>

</style>
