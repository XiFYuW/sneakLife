export const selects = {
  el: 'selectpicker',
  setEl: function (el) {
    if (el) {
      this.el = el
    }
  },
  init: function ($, el) {
    this.setEl(el)
    $('.' + this.el).selectpicker()
  },
  setVal: function (obj, val) {
    obj.selectpicker('val', val)
    obj.selectpicker('refresh')
  }
}
