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
   * @param obj jquery对象
   * @param nodeId 树形视图id
   */
  selectNode: function (obj, nodeId) {
    obj.treeview('selectNode', [nodeId, {silent: true}])
  },
  /**
   * 返回可用节点的数组
   * @param obj jquery对象
   * @returns {*}
   */
  getEnabled: function (obj) {
    return obj.treeview('getEnabled')
  },
  /**
   * 获取nodeId
   * @param obj 元素对象
   * @param p 填充数据字段属性
   * @param row 填充数据项
   */
  getNode: function (obj, p, row) {
    let array = this.getEnabled(obj)
    for (let va in array) {
      if (array[va].value === row[p]) {
        return array[va]
      }
    }
  },
  /**
   * 设置下拉列表树的值
   * @param $ jquery对象
   * @param p 填充数据字段属性
   * @param v 功能输入字段属性
   * @param row 填充数据项
   */
  setSelectTreeVal: function ($, p, v, row) {
    let obj = $('#' + v.id)
    let node = this.getNode(obj, p, row)
    let obj1 = $('#' + v.id.substr(0, 30))
    if (node) {
      obj1.val(node.text)
      this.selectNode(obj, node.nodeId)
    } else {
      this.removeSelectNode(obj, obj1)
    }
  },
  /**
   * 移除下拉列表树的选择状态
   * @param obj 下拉列表树jquery对象
   * @param obj1 输入框jquery对象
   */
  removeSelectNode: function (obj, obj1) {
    obj1.val('')
    let se = this.getSelected(obj)
    for (let i in se) {
      let item = se[i]
      this.toggleNodeSelected(obj, item.nodeId)
    }
  },
  /**
   * 返回所有被选择节点的数组
   * @param obj jquery对象
   * @returns {jQuery|*}
   */
  getSelected: function (obj) {
    return obj.treeview('getSelected')
  },
  /**
   * 获取选择的value
   * @param obj jquery对象
   * @returns {*}
   */
  getSelectedValue: function (obj) {
    let selectTree = this.getSelected(obj)
    if (selectTree.length > 0) {
      return selectTree[0].value
    }
    return ''
  },
  /**
   * 取消选择的节点
   * @param obj jquery对象
   */
  uncheckAll: function (obj) {
    obj.treeview('uncheckAll', { silent: true })
  },
  /**
   * 切换一个节点的选择状态
   * @param obj jquery对象
   * @param nodeId 树形视图id
   */
  toggleNodeSelected: function (obj, nodeId) {
    obj.treeview('toggleNodeSelected', [ nodeId, { silent: true } ])
  }
}
