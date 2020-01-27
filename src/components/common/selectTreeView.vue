<template>
  <div class="input-group">
    <span class="input-group-addon" v-if="isSpan">{{treeView.textName}}</span>
    <label class="control-label" v-else>{{treeView.textName}}</label>
    <input :id="treeView.id.substr(0, 30)" :type="treeView.type" :name="treeView.menuId" autocomplete="off" class="form-control selectTreeView-input"
           v-on:click="showTreeView" aria-describedby="sizing-addon2" tabindex="2">
    <div :id="treeView.id" class="selectTreeView">
      <tree-view></tree-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'select-tree-view',
  components: {
    'tree-view': () => import('./treeView')
  },
  props: {
    treeView: {
      type: Object,
      required: false
    },
    isSpan: {
      type: Boolean,
      required: false
    }
  },
  mounted () {
    this.$jquery('#' + this.treeView.id).mouseleave(() => {
      this.$jquery('#' + this.treeView.id).hide()
    })
  },
  updated () {
    this.$jquery('#' + this.treeView.id.substr(0, 30)).val('')
    this.$utils.selectsTree.options.data = this.treeView[this.treeView.field + 'SelectTreeData']
    this.$utils.selectsTree.init(this.$jquery, this.treeView.id)
  },
  methods: {
    showTreeView: function () {
      const $ = this.$jquery
      let obj = $('#' + this.treeView.id)
      obj.show()
      this.$utils.selectsTree.nodeSelected($, (event, data) => {
        $('#' + this.treeView.id.substr(0, 30)).val(data.text)
        obj.hide()
        this.$utils.selectsTree.selectNode(obj, data.nodeId)
      })
    }
  },
  watch: {
    treeView: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.treeView = newVal
        }
      }
    },
    isSpan: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.isSpan = newVal
        }
      }
    },
    immediate: true,
    deep: true
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
    width: 250px;
    overflow-y: auto;
    height: 300px;
  }
  .selectTreeView-input{
    width: 250px;
    height: 34px;
    margin-left: 0;
    margin-bottom: 0;
  }
</style>
