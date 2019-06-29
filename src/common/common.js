import {central} from './keyless/central'

/**
 * 工具站
 * @type {{parse: (function(*=): *), lazyLoadViews: (function(*=): Promise<{functional: boolean, render(*, {data?: *, children?: *}): *}>)}}
 */
export const utils = {
  id: '',
  code: '',
  toastr: null,
  modalFrame: null,
  central: null,
  url: '',
  http: null,
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
  parse: obj => {
    return JSON.parse(JSON.stringify(obj)).data
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
 * 按钮相关操作
 * 可以动态的修改方法
 * @type {{popover: operaClick.popover, hint: operaClick.hint, updateTable: operaClick.updateTable, selectClickMe: operaClick.selectClickMe, deleteTable: operaClick.deleteTable, addTable: operaClick.addTable}}
 */
export const operaClick = {
  /**
   * add update delete统一入口
   * */
  selectClickMe: function (code, table, $, pop, columns) {
    utils.modalFrame.clearData($)
    utils.setCode(code)
    switch (code) {
      case '0' :
        this.addTable(table, $, columns)
        break
      case '1' :
        this.updateTable(table, $, columns)
        break
      case '2' :
        this.deleteTable(table, $)
        break
      default :
        alert('.....')
    }
  },
  addTable: function (el, $, columns) {
    columns.forEach(item => {
      item.forEach((v, index) => {
        v.value = ''
        // 子组件更新值
        item.splice(index, index + 1, v)
        // this.$set(item, index, v)
      })
    })
    utils.modalFrame.show($)
  },
  updateTable: function (el, $, columns) {
    let data = $('#' + el).bootstrapTable('getAllSelections')
    utils.setId(data[0].id)
    if (this.hint(data)) {
      // 传入子组件的值
      columns.forEach(item => {
        item.forEach((v, index) => {
          let key = v.field
          // 对应key,增加value属性
          for (let i = 0; i < data.length; i++) {
            let jsons = data[i]
            for (let p in jsons) {
              if (key === p) {
                v.value = jsons[p]
              }
            }
          }
          // 子组件更新值
          item.splice(index, index + 1, v)
          // this.$set(item, index, v)
        })
      })
      utils.modalFrame.show($)
    }
  },
  deleteTable: function (el, $) {
    let data = $('#' + el).bootstrapTable('getAllSelections')
    if (this.hint(data)) {
      utils.central.send(utils.http, {me: utils.url, data: {id: data[0].id}}).then(resp => {
        utils.central.toastr.success(resp.respMsg)
      })
    }
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
 * @type {{mountSelect: mountComponent.mountSelect}}
 */
export const mountComponent = {
  /**
   * 过渡组件
   */
  transitionalComponent: {},
  setTransitionalComponent: function (mc) {
    this.transitionalComponent = mc
  },
  getTransitionalComponent: function () {
    return this.transitionalComponent
  },
  /**
   * 挂载下拉列表组件
   * @param el 挂载位置
   */
  mountSelect: function (el) {
    let CommonSelect = this.transitionalComponent.vue.extend(this.transitionalComponent.componentTra)
    new CommonSelect({propsData: {dataSelect: this.transitionalComponent.dataSelect}}).$mount('#' + el)
  }
}
