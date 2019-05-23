export const treeView = {
  el: 'treeView',
  setEl: function (el) {
    if (el) {
      this.el = el
    }
  },
  init: function ($, options, el) {
    this.setEl(el)
    $('#' + this.el).treeview(options)
  },
  getOptions: (el) => {
    this.setEl(el)
    return this.el.data().treeview.options
  }
}
