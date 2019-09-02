import {mountComponent} from './common'
import {selects} from './selects'

export const dataTable = {
  tl: {
    url: '',
    method: 'post',
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
    // 是否启用排序
    sortable: true,
    // 排序方式
    sortOrder: 'asc',
    // 是否显示表格搜索
    search: false,
    // 每一行的唯一标识
    uniqueId: 'id',
    // 是否使用缓存
    cache: false,
    // 字段
    columns: [],
    contentType: 'application/x-www-form-urlencoded'
  },
  /**
   * 设置过渡组件
   * @param mc
   */
  setTraCom: function (mc) {
    mountComponent.setTransitionalComponent(mc)
  },
  /**
   * 渲染数据表格
   * @param el 数据表格元素的位置
   * @param $ jquery
   * @param body 数据表格内容获取形式
   * @param tls 数据表格格式
   */
  init: function (el, $, tls) {
    let table = $('#' + el)
    table.bootstrapTable('destroy')
    table.bootstrapTable(tls)
  },
  /**
   * 渲染select列表
   * @param $ jquery对象
   * @param data 下拉列表数据
   * @param disabled 是否可以操作
   */
  applySelect: function ($, data, disabled) {
    if (mountComponent.getTransitionalComponent()) {
      let rows = data.rows
      $('.rowOperator').each(function () {
        let idTemp = $(this).attr('id')
        let co = $('#' + idTemp)
        co.parent().parent().css({'padding': 0})
        let id = co.parent().attr('id')
        let rowId = id.substr(3, 32)
        let row = {}
        for (let index in rows) {
          if (rows[index].userId === rowId) {
            row = rows[index]
            break
          }
        }
        // 挂载组件
        mountComponent.mountSelect(idTemp)
        let obj = $('#' + id + ' select')
        // 初始化select值
        selects.setVal(obj, row.value)
        $('#' + id + ' label').remove()
        $('#' + id + ' .mba').css('margin-bottom', 'auto')
        // obj.find('option[value=' + row.value + ']').prop('selected', true)
        // 不可修改
        // obj.attr('disabled', disabled)
      })
    }
  },
  /**
   * 数据表格请求参数封装
   * @param params 请求参数
   * @param dataUrl 请求地址
   * @param data 具体的请求参数
   * @param central 服务连接对象
   * @returns {{data: *}}
   */
  queryParams: function (params, dataUrl, data, central) {
    let parameter = {
      me: dataUrl,
      pag: {
        // 页面大小
        rows: params.limit,
        // 页码
        page: params.offset / params.limit,
        // 排序列名
        sort: params.sort,
        // 排序命令（desc，asc）
        sortOrder: params.order
      },
      data: data
    }
    return {data: central.enParameter(parameter)}
  },
  /**
   * 数据表格响应封装
   * @param resp 响应数据
   * @param central 服务连接对象
   * @returns {{total: *, rows: *}}
   */
  responseHandler: function (resp, central) {
    if (central.checkCode(resp)) {
      return {
        total: resp.respData.totalElements,
        rows: resp.respData.content
      }
    }
  }
}
