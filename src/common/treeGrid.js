export const treeGrid = {
  el: 'treeGrid',
  data: [],
  id: 'id',
  pid: 'pid',
  defalut: {
    checkFormatter: function (value, row, index) {
      if (row.check === true) {
        // 设置选中
        return { checked: true }
      }
    },
    statusFormatter: function (value, row, index) {
      if (value === 0) {
        return '<span class="label label-success">正常</span>'
      } else {
        return '<span class="label label-default">锁定</span>'
      }
    }
  },
  tl: {
    url: '',
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    // 工具栏
    toolbar: '#toolbar',
    striped: false,
    sidePagination: 'server',
    idField: this.id,
    columns: [],
    // 在哪一列展开树形
    treeShowField: 'name',
    // 指定父id列
    parentIdField: this.pid,
    // onPostBody  onResetView  onLoadSuccess
    onResetView: null,
    onCheck: null,
    onUncheck: null,
    // 是否使用缓存
    cache: false
  },
  setEl: function (el) {
    if (el) {
      this.el = el
    }
  },
  init: function ($, el) {
    this.setEl(el)
    let treeGrid = $('#' + this.el)
    treeGrid.bootstrapTable('destroy')
    this.tl.onResetView = function () {
      treeGrid.treegrid({
        initialState: 'collapsed',
        treeColumn: 1,
        onChange: function () {
          treeGrid.bootstrapTable('resetWidth')
        }
      })
    }
    this.tl.onCheck = row => {
      this.toAction(treeGrid, row, $, true)
    }
    this.tl.onUncheck = row => {
      this.toAction(treeGrid, row, $, false)
    }
    treeGrid.bootstrapTable(this.tl)
  },
  /**
   * 勾选动作
   * @param treeGrid 元素位置
   * @param row 当前节点
   * @param $ jquery
   * @param check 勾选：true | 取消勾选：false
   */
  toAction: function (treeGrid, row, $, check) {
    this.data = treeGrid.bootstrapTable('getData')
    let show = []
    if (this.isChildNode(row)) {
      show = this.selectChild(row, $, treeGrid, [], check)
    }
    if (this.isParentNode(row)) {
      show = this.selectParentChecked(row, treeGrid, $, [], check)
    }
    treeGrid.bootstrapTable('load', this.data)
    this.showChildNode(show, $)
  },
  /**
   * 选择父节点的子节点  关闭：treegrid-expanded  展开：treegrid-collapsed
   * @param row 当前节点
   * @param $ jquery
   * @param treeGrid 元素位置
   * @param show 需要显示的节点
   * @param check 勾选：true | 取消勾选：false
   * @returns {*} 需要显示的节点
   */
  selectChild: function (row, $, treeGrid, show, check) {
    // 选中父节点所有的子节点
    for (let i in this.data) {
      // 选择子节点
      if (this.data[i][this.pid] === row[this.id]) {
        this.data[i].check = check
        show.push('tr.treegrid-' + this.data[i][this.id] + '.treegrid-parent-' + row[this.id])
        this.selectChild(this.data[i], $, treeGrid, show, check)
      }
    }
    return show
  },
  /**
   * 显示节点
   * @param tempChild 需要显示的节点
   * @param $ jquery
   */
  showChildNode: function (tempChild, $) {
    tempChild.forEach(v => {
      let el = $(v)
      let str = this.cutParentNodeId(v)
      if (str !== '0') {
        el[0].style.display = ''
        this.changeIcon($, str)
      }
    })
  },
  /**
   * 选择子节点的父节点
   * @param row 当前节点
   * @param treeGrid 元素
   * @param $ jquery
   * @param show 需要显示的节点，数组类型
   * @param check 勾选：true | 取消勾选：false
   * @returns {show} 需要显示的节点
   */
  selectParentChecked: function (row, treeGrid, $, show, check) {
    // 同级节点是否还有勾选
    let peer = false
    for (let i in this.data) {
      // 处理同级节点
      if (row[this.pid] === this.data[i][this.pid]) {
        peer = this.data[i].check
        let el = 'tr.treegrid-' + this.data[i][this.id] + '.treegrid-parent-' + this.data[i][this.pid]
        // 过滤相同元素
        if ($.inArray(el, show)) {
          show.push(el)
        }
      }
      // 处理父节点
      if (this.data[i][this.id] === row[this.pid]) {
        // 勾选
        if (check) {
          this.data[i].check = check
        }
        // 取消勾选 && 同级节点是否还有勾选 && 当前节点的同级节点
        if (!check && !peer && row[this.pid] === this.data[i][this.pid]) {
          this.data[i].check = check
        }
        show.push('tr.treegrid-' + row[this.id] + '.treegrid-parent-' + this.data[i][this.id])
        this.selectParentChecked(this.data[i], treeGrid, $, show, check)
      }
    }
    return show
  },
  /**
   * 当前节点是否含有子节点
   * @param row
   * @returns {boolean}
   */
  isChildNode: function (row) {
    for (let v in this.data) {
      if (row[this.id] === this.data[v][this.pid]) {
        return true
      }
    }
  },
  /**
   * 当前节点是否含有父节点
   * @param row
   * @returns {boolean}
   */
  isParentNode: function (row) {
    for (let v in this.data) {
      if (row[this.pid] === this.data[v][this.id]) {
        return true
      }
    }
  },
  /**
   * 截取节点的父节点的id
   * @param v 节点class属性
   * @returns {string | *}
   */
  cutParentNodeId: function (v) {
    let index = v.lastIndexOf('-')
    return v.substr(index + 1, v.length)
  },
  /**
   * 改变父节点图标
   * @param $ jquery
   * @param str 父节点的id
   */
  changeIcon: function ($, str) {
    let le = $('tr.treegrid-' + str + ' td span.treegrid-expander')
    let ls = $('tr.treegrid-' + str)
    if (le.hasClass('treegrid-expander-collapsed') && ls.hasClass('treegrid-collapsed')) {
      le.removeClass('treegrid-expander-collapsed').addClass('treegrid-expander-expanded')
      ls.removeClass('treegrid-collapsed').addClass('treegrid-expanded')
    }
  }
}
