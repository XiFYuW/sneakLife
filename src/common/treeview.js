import {treeGrid} from './treeGrid'
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
    tree.on('nodeSelected ', (event, data) => {
      if (data.url !== '#') {
        treeGrid.init($, http, common, data.url)
      }
    })
  },
  getOptions: (el) => {
    this.setEl(el)
    return this.el.data().treeview.options
  }
}
