<template>
  <div class="container-fluid">
    <h1 class="page-header" v-if="body.head && is">{{body.head}}</h1>
    <div class="row">
      <div v-for="item in body.data" v-bind:key="item.id">
        <div class="col-xs-6 paddingNot">
          <div v-bind:style="item.style" v-bind:id="item.id"></div>
        </div>
      </div>
    </div>
    <load></load>
  </div>
</template>

<script>
import echarts from 'echarts'
import {modalBox} from '@/common/modalBox'
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
export default {
  name: 'system-monitoring',
  data () {
    return {
      body: {},
      is: false
    }
  },
  components: {
    'load': () => import('../../../load/load')
  },
  mounted () {
    this.drawChart()
  },
  props: {
    dataUrl: {
      type: String,
      required: true
    }
  },
  methods: {
    drawChart () {
      let self = this.$http
      modalBox.show(this.$jquery, 'load')
      const timer = setInterval(() => {
        setTimeout(() => {
          modalBox.hide(this.$jquery, 'load')
          self.get(this.dataUrl).then(resp => {
            this.body = this.$common.parse(resp)
            this.body.data.forEach(v => {
              let obj = document.getElementById(v.id)
              if (obj) {
                let myChart = echarts.init(obj)
                this.is = true
                myChart.setOption(v.option)
                window.addEventListener('resize', myChart.resize)
              }
            })
          })
        })
      }, 1000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer)
      })
    }
  },
  watch: {
    option: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.option = newVal
        }
      }
    },
    immediate: true,
    deep: true
  }
}
</script>

<style scoped>
  .paddingNot{
    padding: unset
  }
</style>
