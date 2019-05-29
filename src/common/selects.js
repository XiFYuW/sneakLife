export const selects = {
  el: 'selectpicker',
  setEl: function (el) {
    if (el) {
      this.el = el
    }
  },
  /**
   * 初始化下拉列表
   * @param $
   * @param el
   */
  init: function ($, el) {
    this.setEl(el)
    $('.' + this.el).selectpicker()
  },
  /**
   * 设置下拉列表的值
   * @param obj
   * @param val
   */
  setVal: function (obj, val) {
    obj.selectpicker('val', val)
    obj.selectpicker('refresh')
  }
}
