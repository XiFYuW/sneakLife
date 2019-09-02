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
  /**
   * 设置元素位置
   * @param el 元素位置
   */
  setEl: function (el) {
    if (el) {
      this.el = el
    }
  },
  /**
   * 初始化树形视图
   * @param $ jquery对象
   * @param el 元素位置
   */
  init: function ($, el) {
    this.setEl(el)
    const tree = $('#' + this.el)
    tree.treeview(this.options)
  },
  /**
   * 选中树形视图的节点
   * @param $ jquery对象
   * @param f 回调方法
   */
  nodeSelected: function ($, f) {
    $('#' + this.el).on('nodeSelected ', f)
  },
  /**
   * 选中树形视图的节点
   * @param $ jquery对象
   * @param nodeId 树形视图id
   */
  selectNode: function ($, nodeId) {
    $('#' + this.el).treeview('selectNode', [nodeId, {silent: true}])
  },
  /**
   * 获取树形视图的Options
   * @param el 元素位置
   * @returns {*}
   */
  getOptions: function (el) {
    this.setEl(el)
    return this.el.data().treeview.options
  }
}
