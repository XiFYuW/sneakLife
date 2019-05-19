export const modalBox = {
  /**
   * 模态框弹出的位置
   */
  el: 'modal',
  /**
   * 设置模态框弹出的位置
   * @param el 元素位置
   */
  setEl: function (el) {
    if (el) {
      this.el = el
    }
  },
  /**
   *  清除模态框的数据
   * @param $ jquery
   * @param el 元素位置
   */
  clearData: function ($, el) {
    this.setEl(el)
    $('#' + this.el).on('hidden.bs.modal', function () {
      $(this).removeData('bs.modal')
    })
  },
  /**
   * 显示模态框
   * @param $ jquery
   * @param el 元素位置
   */
  show: function ($, el) {
    this.setEl(el)
    $('#' + this.el).modal('show')
  },
  /**
   * 隐藏模态框
   * @param $ jquery
   * @param el 元素位置
   */
  hide: function ($, el) {
    this.setEl(el)
    $('#' + this.el).modal('hide')
  }
}
