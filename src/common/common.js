/**
 * 中转站，该对象用作数据转换
 */
export const utils = {
  // vue对象
  vue: null,
  // 数据项id,修改操作需要该属性
  id: '',
  // 功能动作值
  code: '',
  // 消息提示对象
  toastr: null,
  // 模态框对象
  modalFrame: null,
  // 服务连接对象
  central: null,
  // 服务请求地址
  url: '',
  // 服务请求对象
  http: null,
  // 数据表格id
  table: '',
  // 下拉列表操作对象
  selects: null,
  // 下拉列表树操作对象
  selectsTree: null,
  // 功能操作对象
  operaClick: null,
  /**
   * 设置功能操作对象
   * @param operaClick 功能操作对象
   */
  setOperaClick: function (operaClick) {
    this.operaClick = operaClick
  },
  /**
   * 设置下拉列表树操作对象
   * @param selectsTree 下拉列表树操作对象
   */
  setSelectsTree: function (selectsTree) {
    this.selectsTree = selectsTree
  },
  /**
   * 下拉列表操作对象
   * @param selects 下拉列表操作对象
   */
  setSelects: function (selects) {
    this.selects = selects
  },
  /**
   * 设置vue对象
   * @param vue vue对象
   */
  setVue: function (vue) {
    this.vue = vue
  },
  /**
   * 设置消息提示对象
   * @param toastr 消息提示对象
   */
  setToastr: function (toastr) {
    this.toastr = toastr
  },
  /**
   * 设置模态框对象
   * @param modalFrame 模态框对象
   */
  setModalFrame: function (modalFrame) {
    this.modalFrame = modalFrame
  },
  /**
   * 设置服务连接对象
   * @param central 服务连接对象
   */
  setCentral: function (central) {
    this.central = central
  },
  /**
   * 设置数据项id
   * @param id 数据项id
   */
  setId: function (id) {
    this.id = id
  },
  /**
   * 设置功能动作值
   * @param code 功能动作值
   */
  setCode: function (code) {
    this.code = code
  },
  /**
   * 设置服务请求地址
   * @param url 服务请求地址
   */
  setUrl: function (url) {
    this.url = url
  },
  /**
   * 设置服务请求对象
   * @param http 服务请求对象
   */
  setHttp: function (http) {
    this.http = http
  },
  /**
   * 设置数据表格id
   * @param table 数据表格id
   */
  setTable: function (table) {
    this.table = table
  },
  /**
   * 把vue对象转为json对象，只取data节点
   * @param obj vue对象，即axios返回的响应
   * @returns {*}
   */
  parse: obj => {
    return JSON.parse(JSON.stringify(obj)).data
  },
  /**
   * 把vue对象转为json对象，取全部
   * @param obj vue对象，即axios返回的响应
   * @returns {any}
   */
  parseAll: obj => {
    return JSON.parse(JSON.stringify(obj))
  },
  /**
   * 添对象属性
   * @param data 对象
   * @param name 键名
   * @param value 值
   * @returns {*}
   */
  addObjProperty: (data, name, value) => {
    data[name] = value
    return data
  },
  /**
   * 获取对象长度
   * @param obj 对象
   * @returns {number}
   */
  getObjLength: obj => {
    return Object.keys(obj).length
  },
  /**
   * 删除对象属性
   * @param obj 对象
   * @param key 键名
   */
  delObjProperty: (obj, key) => {
    if (obj.hasOwnProperty(key)) {
      delete obj[key]
    }
  },
  /**
   * 从数值获取对应属性的值，并以数组返回[key,value]
   * @param arr 包含对象的数组
   * @param item 对象的键名
   * @returns {Array}
   */
  findArray: (arr, item) => {
    let array = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].field === item) {
        array.push(arr[i])
        array.push(i)
        return array
      }
    }
  },
  /**
   * 清除输入的值
   * @param $ jquery对象
   * @param v 功能输入字段属性
   */
  clearAll: function ($, v) {
    this.vue.set(v, 'value', '')
    let obj = $('#' + v.id)
    obj.val('')
    this.selects.setVal(obj, '')
    if (v.htmlType === 'selectsTree') {
      this.selectsTree.removeSelectNode(obj, $('#' + v.id.substr(0, 30)))
    }
  },
  /**
   * 设置输入选项的值
   * @param $ jquery对象
   * @param v 功能输入字段属性集合
   * @param index 功能输入字段索引
   * @param item 功能输入字段项
   * @param data 填充数据
   * @param callback 回调函数
   */
  setInputValue: function ($, v, index, item, data, callback) {
    let key = v.field
    for (let i = 0; i < data.length; i++) {
      let row = data[i]
      for (let p in row) {
        if (key === p) {
          callback($, key, v, p, row, item, index)
        }
      }
    }
  },
  /**
   * 设置输入字段的值，只有inputLable 和 selects两种类型
   * @param $ jquery对象
   * @param key
   * @param v 功能输入字段属性集合
   * @param p 选中一行的数据属性
   * @param row 选中一行的数据集合
   * @param item 功能输入字段项
   * @param index 功能输入字段索引
   * @param selectData 下拉列表数据集合
   */
  setValueBySelects: function ($, key, v, p, row, item, index, selectData) {
    let td = selectData[key]
    if (td) {
      utils.selects.setSelectsVal($, v, p, td, row)
    } else {
      utils.vue.set(v, 'value', row[p])
    }
    // item.splice(index, index + 1, v)
  },
  /**
   * 设置输入字段的值，只有inputLable 和 selectsTree两种类型
   * @param $ jquery对象
   * @param key
   * @param v 功能输入字段属性集合
   * @param p 选中一行的数据属性
   * @param row 选中一行的数据集合
   * @param item 功能输入字段项
   * @param index 功能输入字段索引
   * @param selectTreeData 下拉列表树数据集合
   */
  setValueBySelectTree: function ($, key, v, p, row, item, index, selectTreeData) {
    let td = selectTreeData[key]
    if (td) {
      utils.selectsTree.setSelectTreeVal($, p, v, row)
    } else {
      utils.vue.set(v, 'value', row[p])
    }
    item.splice(index, index + 1, v)
  },
  /**
   * 根据元素类型获取值
   * @param obj 元素对象
   * @param htmlType 元素类型
   * @returns {*}
   */
  switchHtmlTypeValue: function (obj, htmlType) {
    let v = null
    switch (htmlType) {
      case 'inputLable':
        v = obj.val()
        break
      case 'inputText':
        v = obj.val()
        break
      case 'selectsTree':
        v = utils.selectsTree.getSelectedValue(obj)
        break
      case 'selects':
        v = utils.selects.getVal(obj)
        break
      default:
        break
    }
    return v
  },
  /**
   * 获取查询数据
   * @param $ jquery对象
   * @param bo 查询配置数据
   */
  searchData: function ($, bo) {
    let searchData = {}
    operaClick.operaInEach(bo, null, (v, index, item, data) => {
      let obj = $('#' + v.id)
      let s = this.switchHtmlTypeValue(obj, v.htmlType)
      searchData = this.addObjProperty(searchData, v.field, s)
    })
    return searchData
  }
}

/**
 * 对象复制
 * @type {{deepCopy: deepCopy.deepCopy}}
 */
export const deepCopy = {
  deepCopy: function (obj) {
    if (typeof obj !== 'object') {
      return obj
    }
    let newobj = {}
    for (let attr in obj) {
      newobj[attr] = this.deepCopy(obj[attr])
    }
    return newobj
  }
}

/**
 * 功能操作按钮对象
 */
export const operaClick = {
  search: function () {

  },
  remove: function () {

  },
  /**
   * 功能操作按钮统一入口
   * @param code 功能操作值
   * @param table 数据表格id
   * @param $ jquery对象
   * @param columns 功能输入字段
   */
  selectClickMe: function (code, table, $, columns) {
    // 清除模特框表单数据（虽然没什么用）
    utils.modalFrame.clearData($)
    utils.setCode(code)
    utils.setTable(table)
    switch (code) {
      case '0' :
        this.addTable(table, $, columns)
        break
      case '1' :
        this.updateTable(table, $, columns)
        break
      case '2' :
        this.deleteTable(table, $, columns)
        break
      default :
        alert('.....')
    }
  },
  /**
   * 基本添加操作，默认实现
   * @param el 数据表格元素id
   * @param $ jquery对象
   * @param columns 功能输入字段
   */
  addTable: function (el, $, columns) {
    this.operaInEach(columns, null, (v, index, item, data) => {
      utils.vue.set(v, 'value', '')
      $('#' + v.id).val('')
    })
    utils.modalFrame.show($)
  },
  /**
   * 基本修改操作,默认实现
   * @param el 元素位置
   * @param $ jquery对象
   * @param columns 功能输入字段
   */
  updateTable: function (el, $, columns) {
    let data = $('#' + el).bootstrapTable('getAllSelections')
    if (this.hint(data)) {
      utils.setId(data[0].id)
      this.operaInEach(columns, data, (v, index, item, data) => {
        utils.setInputValue($, v, index, item, data, ($, key, v, p, row, item, index) => {
          utils.vue.set(v, 'value', row[p])
        })
      })
      utils.modalFrame.show($)
    }
  },
  /**
   * 基本删除操作，默认实现
   * @param el 元素位置
   * @param $ jquery对象
   * @param columns 功能输入字段
   */
  deleteTable: function (el, $, columns) {
    let data = $('#' + el).bootstrapTable('getAllSelections')
    if (this.hints(data)) {
      let ids = this.getIds(data, ',')
      utils.central.send(utils.http, {me: utils.url, data: {ids: ids}}).then(resp => {
        utils.central.toastr.success(resp.respMsg)
        $('#' + el).bootstrapTable('refresh')
      })
    }
  },
  /**
   * 获取以逗号隔开的id
   * @param data 选择的数据
   * @param pa 隔开字符
   * @returns {string}
   */
  getIds: function (data, pa) {
    let ids = ''
    let end = data.length - 1 + ''
    for (let i in data) {
      if (i === end) {
        ids += data[i].id
      } else {
        ids += data[i].id + pa
      }
    }
    return ids
  },
  /**
   * 功能输入字段处理
   * @param columns 功能输入字段
   * @param data 填充数据
   * @param callback 回调函数
   */
  operaInEach: function (columns, data, callback) {
    columns.forEach(item => {
      item.forEach((v, index) => {
        callback(v, index, item, data)
        // this.operaInEachCallback(callback, v, index, item, data)
      })
    })
  },
  /**
   * 功能输入字段具体处理
   * @param callback 回调函数
   * @param v 功能输入字段属性集合
   * @param index 功能输入字段索引
   * @param item 功能输入字段项
   * @param data 填充数据
   */
  operaInEachCallback: function (callback, v, index, item, data) {
    callback(v, index, item, data)
  },
  /**
   * 初始化数据字段类型为下拉列表树
   * @param v 功能输入字段属性集合
   * @param index 功能输入字段索引
   * @param item 功能输入字段项
   * @param data 填充数据
   * @param selectTreeData 下拉列表树数据
   */
  initSelectTree: function (v, index, item, data, selectTreeData) {
    let ds = selectTreeData[v.field]
    if (ds) {
      // 给v增加v.field + 'selectTreeData'属性，修改数据操作可以匹配去取值
      utils.vue.set(v, v.field + 'SelectTreeData', ds)
    }
    // item.splice(index, index + 1, v)
  },
  /**
   * 初始化数据字段类型为下拉列表
   * @param v 功能输入字段属性集合
   * @param index 功能输入字段索引
   * @param item 功能输入字段项
   * @param data 填充数据
   * @param selectData 下拉列表数据
   */
  initSelects: function (v, index, item, data, selectData) {
    // 下来列表初始化
    let ds = selectData[v.field]
    if (ds) {
      // 添加新属性
      utils.vue.set(v, v.field + 'SelectData', ds)
    }
    // 加上会意外的删除功能元素
    // item.splice(index, index + 1, v)
  },
  /**
   * 基本消息提示
   * @param data 填充数据
   * @param $ jquery对象
   * @param el 元素位置
   * @returns {boolean}
   */
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
  /**
   * 基本消息提示
   * @param data 填充数据
   * @returns {boolean}
   */
  hint: function (data) {
    if (data.length === 0 || data.length > 1) {
      utils.toastr.warning('请选择一行')
      return false
    }
    return true
  },
  /**
   * 基本消息提示
   * @param data 填充数据
   * @returns {boolean}
   */
  hints: function (data) {
    if (data.length === 0) {
      utils.toastr.warning('请至少选择一行')
      return false
    }
    return true
  }
}

/**
 * 挂载组件
 * @type {{transitionalComponent: {}, mountSelect: mountComponent.mountSelect, setTransitionalComponent: mountComponent.setTransitionalComponent, getTransitionalComponent: (function(): (mountComponent.transitionalComponent|{}))}}
 */
export const mountComponent = {
  /**
   * 过渡组件对象
   */
  transitionalComponent: {},
  /**
   * 设置过渡组件
   * @param mc
   */
  setTransitionalComponent: function (mc) {
    this.transitionalComponent = mc
  },
  /**
   * 获取过渡组件
   * @returns {mountComponent.transitionalComponent|{}}
   */
  getTransitionalComponent: function () {
    return this.transitionalComponent
  },
  /**
   * 挂载下拉列表组件
   * @param el 挂载位置
   */
  mountSelect: function (el, es) {
    let CommonSelect = this.transitionalComponent.vue.extend(this.transitionalComponent.componentTra)
    utils.vue.set(this.transitionalComponent.selectCol, 'id', es)
    new CommonSelect(
      {
        propsData:
          {
            selectCol: this.transitionalComponent.selectCol,
            isMnh: this.transitionalComponent.isMnh
          }
      }
    ).$mount('#' + el)
  }
}
/**
 * 加载视图
 * @param AsyncView
 * @returns {*}
 */
export const AsyncView = {
  lazyLoadViews: function (AsyncView) {
    const AsyncHandler = () => ({
      component: AsyncView,
      loading: require('../components/load/load').default,
      error: require('../components/load/loadErr').default,
      delay: 200,
      timeout: 3000
    })
    return Promise.resolve({
      functional: true,
      render (h, {data, children}) {
        return h(AsyncHandler, data, children)
      }
    })
  }
}
