export const datetimepicker = {
  el: 'form_datetime',
  tl: {
    // 语言
    language: 'zh-CN',
    // 一周从哪一天开始
    weekStart: 0,
    // 开始时间
    startDate: '',
    // 结束时间
    endDate: '',
    // 一周的周几不能选
    daysOfWeekDisabled: [],
    // 选完时间后是否自动关闭
    autoclose: false,
    // 当天日期按钮
    todayBtn: true,
    // 当天日期高亮
    todayHighlight: true,
    // 初始化日期时间
    initialDate: new Date(),
    // 是否显示上下午
    showMeridian: false,
    // 'bottom-left’，’top-right’，’top-left’
    pickerPosition: 'bottom-right',
    // 步进值
    minuteStep: 5,
    // 强制解析
    forceParse: true
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
   * 初始化日期控件
   * @param $ jquery对象
   * @param el 元素位置
   */
  init: function ($, el) {
    this.setEl(el)
    $('.' + this.el).datetimepicker(this.tl)
  }
}
