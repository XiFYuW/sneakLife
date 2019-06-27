/**
 * 工具对象
 * @type {{parse: (function(*=): *), lazyLoadViews: (function(*=): Promise<{functional: boolean, render(*, {data?: *, children?: *}): *}>)}}
 */
export const utils = {
  toastr: null,
  modalFrame: null,
  setToastr: function (toastr) {
    this.toastr = toastr
  },
  setModalFrame: function (modalFrame) {
    this.modalFrame = modalFrame
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
 * @type {{dataT: Array, popover: operaClick.popover, updateTable: operaClick.updateTable, selectClickMe: operaClick.selectClickMe, deleteTable: operaClick.deleteTable, addTable: operaClick.addTable}}
 */
export const operaClick = {
  /**
   * dataTable选中的临时数据，update适用
   * */
  dataT: [],
  /**
   * add update delete统一入口
   * */
  selectClickMe: function (code, table, $, pop, columns) {
    utils.modalFrame.clearData($)
    switch (code) {
      case '0' :
        this.addTable(table, $, pop, columns)
        break
      case '1' :
        this.updateTable(table, $, pop, columns)
        break
      case '2' :
        this.deleteTable(table, $, pop)
        break
      default :
        alert('.....')
    }
  },
  addTable: function (el, $, pop, columns) {
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
  updateTable: function (el, $, pop, columns) {
    this.dataT = $('#' + el).bootstrapTable('getAllSelections')
    if (!this.hint(this.dataT)) {
      // 传入子组件的值
      columns.forEach(item => {
        item.forEach((v, index) => {
          let key = v.field
          // 对应key,增加value属性
          for (let i = 0; i < this.dataT.length; i++) {
            let jsons = this.dataT[i]
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
  deleteTable: function (el, $, pop) {
    let data = $('#' + el).bootstrapTable('getAllSelections')
    if (!this.popover(data, $, pop)) {
      console.log('delete')
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
      this.utils.toastr.warning('请选择一行')
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
