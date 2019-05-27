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
  setVal: function ($, val) {
    $('.' + this.el).selectpicker('val', val)
  }
}
