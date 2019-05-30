export const treeView = {
  el: 'treeView',
  setEl: function (el) {
    if (el) {
      this.el = el
    }
  },
  init: function ($, options, http, common, el) {
    this.setEl(el)
    const tree = $('#' + this.el)
    tree.treeview(options)
  },
  nodeSelected: function ($, f) {
    $('#' + this.el).on('nodeSelected ', f)
  },
  getOptions: (el) => {
    this.setEl(el)
    return this.el.data().treeview.options
  }
}
