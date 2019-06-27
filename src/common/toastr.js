export const myToastr = {
  toastr: null,
  option: {
    closeButton: false,
    debug: false,
    progressBar: false,
    positionClass: 'toast-center-center',
    onclick: null,
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '3000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
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
