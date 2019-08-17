<template>
  <div class="container-fluid">
    <h1 class="page-header" v-if="body.head && isHead">{{body.head}}</h1>
    <div class="row">
      <div v-for="item in body.data" v-bind:key="item.id">
        <div class="col-xs-6 paddingNot">
          <div v-bind:style="item.style" v-bind:id="item.id"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
const copy = require('../../../../common/common').deepCopy
export default {
  name: 'system-monitoring',
  data () {
    return {
      body: {},
      isHead: false,
      series: {
        'name': '',
        'type': 'line',
        'smooth': true,
        'itemStyle': {
          'normal': {
            'areaStyle': {
              'type': 'default'
            }
          }
        },
        'data': []
      },
      xAxis: {
        'type': 'category',
        'boundaryGap': false,
        'data': []
      }
    }
  },
  mounted () {
    this.drawChart()
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    drawChart () {
      this.$http.get('static/config/cpuConfig').then(modal => {
        modal = this.$utils.parse(modal)
        const timer = setInterval(() => {
          setTimeout(() => {
            this.$utils.central.send(this.$utils.http, {me: 'cpuListen', data: {}}).then(resp => {
              this.body = resp.respData
              console.log(this.body.data)
              this.body.data.forEach(v => {
                modal.id = v.id
                modal.option.title.text = v.text
                modal.option.title.subtext = v.subtext
                modal.option.legend.data = v.legendData
                this.xAxis.data = v.xAxisData
                let series = copy.deepCopy(this.series)
                for (let i = 0; i < v.legendData.length; i++) {
                  series.name = v.legendData[i]
                  series.data = v.seriesDataList[i]
                  console.log(series)
                  modal.option.series.push(series)
                }
                modal.option.xAxis = this.xAxis
                let obj = document.getElementById(modal.id)
                if (obj) {
                  let myChart = echarts.init(obj)
                  this.isHead = true
                  myChart.setOption(modal.option)
                  window.addEventListener('resize', myChart.resize)
                }
              })
            })
          })
        }, 3000)
        this.$once('hook:beforeDestroy', () => {
          clearInterval(timer)
        })
      })
    }
  },
  watch: {
    body: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.body = newVal
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
