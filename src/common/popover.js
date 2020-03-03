export const popover = {
  applyLog: function ($, cla) {
    $('.' + cla).each((index, el) => {
      let value = $(el).text()
      let id = $(el).attr('id')
      $(el).click(() => {
        this.mouseOver($, value, id)
      })
    })
  },
  mouseOver: function ($, value, id) {
    let o = $('#' + id)
    o.popover({
      placement: 'bottom',
      content: value,
      trigger: 'focus',
      delay: { 'show': 500, 'hide': 100 }
    })
    o.popover('show')
    let ariaId = o.attr('aria-describedby')
    $('#' + ariaId).mouseleave(() => {
      this.mouseLeave($, id)
    })
    let ariaObj1 = $('#' + ariaId + ' .popover-content')
    ariaObj1.addClass('popover-x')
  },
  mouseLeave: function ($, id) {
    let o = $('#' + id)
    o.popover('destroy')
  }
}
