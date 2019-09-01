/**
 * 中转站
 * @type {{parse: (function(*=): *), lazyLoadViews: (function(*=): Promise<{functional: boolean, render(*, {data?: *, children?: *}): *}>)}}
 */
export const utils = {
  vue: null,
  id: '',
  code: '',
  toastr: null,
  modalFrame: null,
  central: null,
  url: '',
  http: null,
  table: '',
  selectTreeViewData: null,
  setSelectTreeViewData: function (item) {
    this.selectTreeViewData = item
  },
  setVue: function (vue) {
    this.vue = vue
  },
  setToastr: function (toastr) {
    this.toastr = toastr
  },
  setModalFrame: function (modalFrame) {
    this.modalFrame = modalFrame
  },
  setCentral: function (central) {
    this.central = central
  },
  setId: function (id) {
    this.id = id
  },
  setCode: function (code) {
    this.code = code
  },
  setUrl: function (url) {
    this.url = url
  },
  setHttp: function (http) {
    this.http = http
  },
  setTable: function (table) {
    this.table = table
  },
  parse: obj => {
    return JSON.parse(JSON.stringify(obj)).data
  },
  parseAll: obj => {
    return JSON.parse(JSON.stringify(obj))
  },
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
      render (h, { data, children }) {
        return h(AsyncHandler, data, children)
      }
    })
  },
  toObj: (data, name, value) => {
    data[name] = value
    return data
  },
  getObjLength: obj => {
    return Object.keys(obj).length
  },
  delObj: (obj, key) => {
    if (obj.hasOwnProperty(key)) {
      delete obj[key]
    }
  },
  addObjAttr: null,
  findArray: (arr, item) => {
    let array = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].field === item) {
        array.push(arr[i])
        array.push(i)
        return array
      }
    }
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
   * @param code
   * @param table
   * @param $
   * @param pop
   * @param columns
   */
  selectClickMe: function (code, table, $, pop, columns) {
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
   * 基本添加操作
   * @param el
   * @param $
   * @param columns
   */
  addTable: function (el, $, columns) {
    columns.forEach(item => {
      item.forEach((v, index) => {
        v.value = ''
        item.splice(index, index + 1, v)
      })
    })
    utils.modalFrame.show($)
  },
  /**
   * 基本修改操作
   * @param el
   * @param $
   * @param columns
   */
  updateTable: function (el, $, columns) {
    let data = $('#' + el).bootstrapTable('getAllSelections')
    if (this.hint(data)) {
      utils.setId(data[0].id)
      // 传入子组件的值
      columns.forEach(item => {
        item.forEach((v, index) => {
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
          // item.splice(index, index + 1, v)
        })
      })
      utils.modalFrame.show($)
    }
  },
  /**
   * 基本删除操作
   * @param el
   * @param $
   * @param columns
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
   * @param data
   * @param $
   * @param el
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
   * @param data
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
