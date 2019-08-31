export const selects = {
  el: 'selectpicker',
  /**
   * 初始化下拉列表
   * @param $
   * @param el
   */
  init: function ($, el) {
    if (el) {
      $('#' + el).selectpicker()
    } else {
      $('.' + this.el).selectpicker()
    }
  },
  /**
   * 设置下拉列表的值
   * @param obj
   * @param val
   */
  setVal: function (obj, val) {
    obj.selectpicker('val', val)
    obj.selectpicker('refresh')
    // obj.selectpicker('render')
  },
  /**
   * 获取下拉列表的值
   * @param obj
   * @returns {*}
   */
  getVal: function (obj) {
    let data = obj.find('option:selected').selectpicker('val').get('0')
    return data.value
  }
}
