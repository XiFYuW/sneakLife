export const treeView = {
  el: 'treeView',
  options: {
    data: [],
    // 扩展到5个级别
    levels: 5,
    // 多选
    multiSelect: false,
    // 是否突出显示所选节点
    highlightSelected: true
  },
  setEl: function (el) {
    if (el) {
      this.el = el
    }
  },
  init: function ($, el) {
    this.setEl(el)
    const tree = $('#' + this.el)
    tree.treeview(this.options)
  },
  nodeSelected: function ($, f) {
    $('#' + this.el).on('nodeSelected ', f)
  },
  selectNode: function ($, nodeId) {
    $('#' + this.el).treeview('selectNode', [nodeId, {silent: true}])
  },
  getOptions: function (el) {
    this.setEl(el)
    return this.el.data().treeview.options
  }
}
