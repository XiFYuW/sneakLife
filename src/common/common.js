/**
 * 中转站，该对象用作数据转换
 * @type {{parse: (function(*=): *), lazyLoadViews: (function(*=): Promise<{functional: boolean, render(*, {data?: *, children?: *}): *}>)}}
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
  // 下拉列表树所选临时数据
  selectTreeViewData: null,
  // 下拉列表对象
  selects: null,
  /**
   * 设置下拉列表对象
   * @param selects 下拉列表对象
   */
  setSelects: function (selects) {
    this.selects = selects
  },
  /**
   * 设置下拉列表树所选临时数据
   * @param item 下拉列表树所选临时数据
   */
  setSelectTreeViewData: function (item) {
    this.selectTreeViewData = item
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
   * 加载视图
   * @param AsyncView
   * @returns {*}
   */
  lazyLoadViews: AsyncView => {
    const AsyncHandler = () => ({
      component: AsyncView,
      loading: require('@/components/load/load').default,
      error: require('@/components/load/load').default,
      delay: 200,
      timeout: 2000
    })
    return Promise.resolve({
      functional: true,
      render (h, {data, children}) {
        return h(AsyncHandler, data, children)
      }
    })
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
   * 根据填充数据属性生成相应的输入项
   * @param $ jquery对象
   * @param data 填充数据
   * @param v 功能输入字段属性
   * @param item 功能输入字段索项
   * @param index 功能输入字段索引
   * @param selectData 下拉列表数据
   */
  byPageData: function ($, data, v, item, index, selectData) {
    let key = v.field
    for (let i = 0; i < data.length; i++) {
      let jsons = data[i]
      for (let p in jsons) {
        if (key === p) {
          let td = selectData[key]
          if (td) {
            this.selects.setSelectsVal($, v, p, td, jsons)
          } else {
            // 对应key,增加value属性
            this.vue.set(v, 'value', jsons[p])
          }
          item.splice(index, index + 1, v)
        }
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
    this.selects.setVal(obj, '')
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
 * @type {{popover: operaClick.popover, hint: operaClick.hint, updateTable: operaClick.updateTable, selectClickMe: operaClick.selectClickMe, deleteTable: operaClick.deleteTable, addTable: operaClick.addTable}}
 */
export const operaClick = {
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
      v.value = ''
      item.splice(index, index + 1, v)
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
        let key = v.field
        // 对应key,增加value属性
        for (let i = 0; i < data.length; i++) {
          let jsons = data[i]
          for (let p in jsons) {
            if (key === p) {
              utils.vue.set(v, 'value', jsons[p])
            }
          }
        }
        item.splice(index, index + 1, v)
      })
      utils.modalFrame.show($)
    }
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
        this.operaInEachCallback(callback, v, index, item, data)
      })
    })
  },
  /**
   * 功能输入字段具体处理
   * @param callback 回调函数
   * @param v 功能输入字段属性
   * @param index 功能输入字段索引
   * @param item 功能输入字段项
   * @param data 填充数据
   */
  operaInEachCallback: function (callback, v, index, item, data) {
    callback(v, index, item, data)
  },
  /**
   * 基本删除操作，默认实现
   * @param el 元素位置
   * @param $ jquery对象
   * @param columns 功能输入字段
   */
  deleteTable: function (el, $, columns) {
    let data = $('#' + el).bootstrapTable('getAllSelections')
    if (this.hint(data)) {
      utils.central.send(utils.http, {me: utils.url, data: {id: data[0].id}}).then(resp => {
        utils.central.toastr.success(resp.respMsg)
        $('#' + el).bootstrapTable('refresh')
      })
    }
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
  mountSelect: function (el) {
    let CommonSelect = this.transitionalComponent.vue.extend(this.transitionalComponent.componentTra)
    new CommonSelect(
      {
        propsData:
          {
            dataSelect: this.transitionalComponent.dataSelect
          }
      }
    ).$mount('#' + el)
  }
}
