export const selects = {
  el: 'selectpicker',
  /**
   * 初始化下拉列表
   * @param $ jquery对象
   * @param el 下拉列表元素位置
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
   * @param obj 下拉列表元素对象
   * @returns {*}
   */
  getVal: function (obj) {
    let data = obj.find('option:selected').selectpicker('val').get('0')
    return data.value
  },
  /**
   * 初始化下拉列表的值
   * @param $ jquery对象
   * @param v 功能输入字段属性
   * @param p 填充数据字段属性
   * @param td 下拉列表数据项
   * @param jsons 填充数据项
   */
  setSelectsVal: function ($, v, p, td, jsons) {
    let obj = $('#' + v.id)
    for (let va in td) {
      if (td[va].name === jsons[p]) {
        this.setVal(obj, td[va].value)
      }
    }
  }
}
