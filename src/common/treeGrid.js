export const treeGrid = {
  el: 'treeGrid',
  data: [],
  id: 'id',
  pid: 'pid',
  setEl: function (el) {
    if (el) {
      this.el = el
    }
  },
  init: function ($, http, common, el) {
    this.setEl(el)
    let treeGrid = $('#' + this.el)
    treeGrid.bootstrapTable({
      url: '/static/json/system/treeGrid.json',
      striped: true,
      sidePagination: 'server',
      idField: this.id,
      columns: [
        { field: 'check',
          checkbox: true,
          formatter: function (value, row, index) {
            if (row.check === true) {
              // 设置选中
              return { checked: true }
            }
          }
        },
        { field: 'name', title: '名称' },
        { field: 'status',
          title: '状态',
          sortable: true,
          align: 'center',
          formatter: function (value, row, index) {
            if (value === 1) {
              return '<span class="label label-success">正常</span>'
            } else {
              return '<span class="label label-default">锁定</span>'
            }
          }},
        { field: 'permissionValue', title: '权限值' }
      ],
      // 在哪一列展开树形
      treeShowField: 'name',
      // 指定父id列
      parentIdField: this.pid,
      // onPostBody  onResetView  onLoadSuccess
      onResetView: function () {
        treeGrid.treegrid({
          initialState: 'collapsed',
          treeColumn: 1,
          onChange: function () {
            treeGrid.bootstrapTable('resetWidth')
          }
        })
      },
      onCheck: row => {
        this.data = treeGrid.bootstrapTable('getData')
        let show = []
        if (this.isChildNode(row)) {
          show = this.selectChild(row, $, treeGrid, [], true)
        }
        if (this.isParentNode(row)) {
          show = this.selectParentChecked(row, treeGrid, $, [], true)
        }
        treeGrid.bootstrapTable('load', this.data)
        this.showChildNode(show, $)
      },
      onUncheck: row => {
        this.data = treeGrid.bootstrapTable('getData')
        let show = []
        if (this.isChildNode(row)) {
          show = this.selectChild(row, $, treeGrid, [], false)
        }
        if (this.isParentNode(row)) {
          show = this.selectParentChecked(row, treeGrid, $, [], false)
        }
        treeGrid.bootstrapTable('load', this.data)
        this.showChildNode(show, $)
      }
    })
  },
  /**
   * treegrid-expanded  treegrid-collapsed
   * 选择父节点的子节点
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
  showChildNode: function (tempChild, $) {
    console.log(tempChild)
    tempChild.forEach(v => {
      let el = $(v)
      let index = v.lastIndexOf('-')
      let str = v.substr(index + 1, v.length)
      if (str !== '0') {
        el[0].style.display = ''
        // 改变图标
        let le = $('tr.treegrid-' + str + ' td span.treegrid-expander')
        let ls = $('tr.treegrid-' + str)
        if (le.hasClass('treegrid-expander-collapsed') && ls.hasClass('treegrid-collapsed')) {
          le.removeClass('treegrid-expander-collapsed').addClass('treegrid-expander-expanded')
          ls.removeClass('treegrid-collapsed').addClass('treegrid-expanded')
        }
      }
    })
  },
  /**
   * 选择子节点的父节点
   * @param row 子节点
   */
  selectParentChecked: function (row, treeGrid, $, show, check) {
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
        if (check) {
          this.data[i].check = check
        }
        if (!check && !peer && row[this.pid] === this.data[i][this.pid]) {
          this.data[i].check = check
        }
        show.push('tr.treegrid-' + row[this.id] + '.treegrid-parent-' + this.data[i][this.id])
        this.selectParentChecked(this.data[i], treeGrid, $, show, check)
      }
    }
    return show
  },
  isChildNode: function (row) {
    for (let v in this.data) {
      console.log(this.data[v][this.pid])
      if (row[this.id] === this.data[v][this.pid]) {
        return true
      }
    }
  },
  isParentNode: function (row) {
    for (let v in this.data) {
      if (row[this.pid] === this.data[v][this.id]) {
        return true
      }
    }
  }
}
