<template>
  <div class="input-group">
    <span class="input-group-addon" id="sizing-addon2">下拉树</span>
    <input id="tv" type="text" autocomplete="off" class="form-control selectTreeView-input"
           v-on:click="showTreeView" aria-describedby="sizing-addon2" tabindex="2">
    <div id="select-tree-view" class="selectTreeView">
      <tree-view></tree-view>
    </div>
  </div>
</template>

<script>
import {treeView} from '../../common/treeview'
const treeViewCopy = require('../../common/common').deepCopy.deepCopy(treeView)
export default {
  name: 'select-tree-view',
  components: {
    'tree-view': () => import('./treeView')
  },
  mounted () {
    this.$http.get('static/json/system/body/AuthorityControl/functionConfig/functionConfig.json').then(resp => {
      const data = this.$utils.parse(resp)
      const $ = this.$jquery
      treeViewCopy.options.data = data.data
      treeViewCopy.init($, 'select-tree-view')
    })

    this.$jquery('#select-tree-view').mouseleave(() => {
      this.$jquery('#select-tree-view').hide()
    })
  },
  methods: {
    showTreeView: function () {
      const $ = this.$jquery
      let obj = $('#select-tree-view')
      obj.show()
      treeViewCopy.nodeSelected($, (event, data) => {
        $('#tv').val(data.text)
        obj.hide()
        treeViewCopy.selectNode($, data.nodeId)
      })
    }
  }
}
</script>

<style scoped>
  .selectTreeView{
    display: none;
    position:absolute;
    z-index:1010;
    background-color:white;
    margin-top:34px;
    width: 250px
  }
  .selectTreeView-input{
    width: 250px;
    height: 34px;
    margin-left: 0;
    margin-bottom: 0;
  }
</style>
