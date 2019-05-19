<template>
  <div class="container-fluid">
    <h1 class="page-header">Dashboard</h1>
    <div class="row">
      <div v-for="item in option" v-bind:key="item.id">
        <div class="col-xs-6 paddingNot">
          <div v-bind:style="item.style" v-bind:id="item.id"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
export default {
  name: 'system-monitoring',
  data () {
    return {
      option: []
    }
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
      const timer = setInterval(() => {
        setTimeout(() => {
          self.get(this.dataUrl).then(resp => {
            this.option = this.$common.parse(resp)
            this.option.forEach(v => {
              let obj = document.getElementById(v.id)
              if (obj) {
                let myChart = echarts.init(obj)
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
