export const myToastr = {
  toastr: null,
  option: {
    // 是否显示关闭按钮（提示框右上角关闭按钮）
    closeButton: false,
    // 是否为调试
    debug: false,
    // 是否显示进度条（设置关闭的超时时间进度条）
    progressBar: true,
    // 消息框在页面显示的位置
    positionClass: 'toast-center-center',
    // 点击消息框自定义事件
    onclick: null,
    // 显示动作时间
    showDuration: 1000,
    // 隐藏动作时间
    hideDuration: 800,
    // 自动关闭超时时间
    timeOut: 3000,
    // 关闭动作时间
    closeDuration: 600,
    // 加长展示时间
    extendedTimeOut: 300,
    // 显示时的动画缓冲方式
    showEasing: 'swing',
    // 消失时的动画缓冲方式
    hideEasing: 'linear',
    // 关闭时的动画缓冲方式
    closeEasing: 'linear',
    // 显示时的动画方法
    showMethod: 'slideDown',
    // 消失时的动画方法
    hideMethod: 'slideUp',
    // 关闭时的动画方法
    closeMethod: 'slideUp'
  },
  init: function (toastr) {
    this.toastr = toastr
  },
  setOption: function (option) {
    this.option = option
  },
  success: function (msg, title) {
    this.toastr.success(msg, title, this.option)
  },
  info: function (msg, title) {
    this.toastr.info(msg, title, this.option)
  },
  warning: function (msg, title) {
    this.toastr.warning(msg, title, this.option)
  },
  error: function (msg, title) {
    this.toastr.error(msg, title, this.option)
  },
  remove: function () {
    this.toastr.remove()
  },
  clear: function () {
    this.toastr.clear()
  }
}
