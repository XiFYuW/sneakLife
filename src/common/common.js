export const common = {
  parse: obj => {
    return JSON.parse(JSON.stringify(obj)).data
  },
  bootstrapTable: function (el, $, body, tl) {
    tl = tl || {
      data: body.data,
      striped: true,
      clickToSelect: true,
      showColumns: true,
      showRefresh: true,
      sortable: true,
      pagination: true,
      sidePagination: 'server',
      pageNumber: 1,
      pageSize: 10,
      columns: body.clo,
      onLoadSuccess: function (res) {
        console.info('加载成功')
        console.log(res)
      },
      onLoadError: function () {
        console.info('加载数据失败')
      }
    }
    $('#' + el).bootstrapTable(tl)
  },
  popover: (data, $, el) => {
    let o = $('.' + el)
    if (data.length === 0 || data.length > 1) {
      o.popover({
        placement: 'bottom',
        content: '请选择一行',
        trigger: 'focus'
      })
      o.popover('show')
      setTimeout(function () {
        o.popover('destroy')
      }, 1000)
      return true
    }
    return false
  },
  selectClickMe: function (code, table, $, pop) {
    switch (code) {
      case 0 :
        this.addTable(table, $, pop)
        break
      case 1 :
        this.updateTable(table, $, pop)
        break
      case 2 :
        this.deleteTable(table, $, pop)
        break
      default :
        alert('.....')
    }
  },
  addTable: function (el, $, pop) {
    let data = $('#' + el).bootstrapTable('getAllSelections')
    console.log('addTables : ', data)
  },
  updateTable: function (el, $, pop) {
    let data = $('#' + el).bootstrapTable('getAllSelections')
    console.log('updateTables : ', data)
    if (!this.popover(data, $, pop)) {
      console.log('.......')
    }
  },
  deleteTable: function (el, $, pop) {
    let data = $('#' + el).bootstrapTable('getAllSelections')
    console.log('deleteTables : ', data)
  }
}
