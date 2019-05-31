<template>
  <div class="form-group">
    <label class="col-lg-2 col-md-2 control-label">上级目录</label>
    <input id="selectCatalog" type="text" autocomplete="off" class="col-lg-10 col-md-2 form-group selectTreeView-input" onclick="$('#tree').show()" tabindex="2">
    <div id="select-tree-view" class="selectTreeView"></div>
  </div>
</template>

<script>
export default {
  name: 'select-tree-view',
  methods: {
    showTreeView: function () {

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
    margin-left:95px;
    width: 250px
  }

  .selectTreeView-input{
    width: 250px;
    height: 31px;
    margin-left: 10px;
    margin-bottom: 0px;
  }
</style>
