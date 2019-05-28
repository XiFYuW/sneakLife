import {mountComponent} from './common'
import {selects} from './selects'

export const bootstrapTable = {
  setTraCom: function (mc) {
    mountComponent.setTransitionalComponent(mc)
  },
  /**
   * 渲染数据表格
   * @param el 数据表格元素的位置
   * @param $ jquery
   * @param body 数据表格内容获取形式
   * @param tl 数据表格格式
   */
  init: function (el, $, body, tl) {
    tl = {
      url: body.data,
      // 工具栏
      toolbar: '#toolbar',
      // 是否显示导出按钮
      showExport: true,
      // 设置true为显示切换按钮以切换表/卡视图
      showToggle: false,
      // 设置true为显示全屏按钮
      showFullscreen: false,
      // 设置true为显示分页切换按钮
      showPaginationSwitch: true,
      // 设置true为显示列下拉列表
      showColumns: true,
      // 设置true为显示刷新按钮
      showRefresh: true,
      // 条纹显示
      striped: true,
      // 单击选中
      clickToSelect: true,
      // 设置true为在桌面底部显示分页工具栏
      pagination: true,
      // 分页方式：server、client
      sidePagination: 'server',
      columns: body.clo,
      onLoadSuccess: data => {
        if (mountComponent.getTransitionalComponent()) {
          let rows = data.rows
          $('.rowOperator').each(function () {
            let idTemp = $(this).attr('id')
            let co = $('#' + idTemp)
            co.parent().parent().css({'padding': 0})
            let id = co.parent().attr('id')
            let rowId = id.substr(3, 4)
            let row = rows[rowId]
            // 挂载组件
            mountComponent.mountSelect(idTemp)
            let obj = $('#' + id + ' select')
            // 初始化select值
            selects.setVal(obj, row.value)
            // 不可修改
            obj.attr('disabled', true)
          })
        }
      }
    } || tl
    $('#' + el).bootstrapTable(tl)
  }
}
