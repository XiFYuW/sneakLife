import {modalBox} from './modalBox'
export const common = {
  /**
   * dataTable选中的数据，update适用
   * */
  dataT: [],
  parse: obj => {
    return JSON.parse(JSON.stringify(obj)).data
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
  /**
   * add update delete统一入口
   * */
  selectClickMe: function (code, table, $, pop, upData) {
    modalBox.clearData($)
    switch (code) {
      case 0 :
        this.addTable(table, $, pop, upData)
        break
      case 1 :
        this.updateTable(table, $, pop, upData)
        break
      case 2 :
        this.deleteTable(table, $, pop)
        break
      default :
        alert('.....')
    }
  },
  addTable: function (el, $, pop, upData) {
    upData.forEach(item => {
      item.forEach((v, index) => {
        v.value = ''
        // 子组件更新值
        item.splice(index, index + 1, v)
        // this.$set(item, index, v)
      })
    })
    modalBox.show($)
  },
  updateTable: function (el, $, pop, upData) {
    this.dataT = $('#' + el).bootstrapTable('getAllSelections')
    if (!this.popover(this.dataT, $, pop)) {
      // 传入子组件的值
      upData.forEach(item => {
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
      modalBox.show($)
    }
  },
  deleteTable: function (el, $, pop) {
    let data = $('#' + el).bootstrapTable('getAllSelections')
    if (!this.popover(data, $, pop)) {
      console.log('delete')
    }
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
  }
}
