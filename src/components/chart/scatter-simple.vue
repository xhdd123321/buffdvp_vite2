<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default () { return {} }
  }
})
let myChart = null
const chartRef = ref(null)
const initChart = () => {
  const myData = props.data
  const xtitle = Object.keys(myData)[0]
  const ytitle = Object.keys(myData)[1]
  const xlist = Object.values(myData)[0]
  const ylist = Object.values(myData)[1]
  const dataSet = []
  for (const index in xlist) {
    dataSet.push([xlist[index], ylist[index]])
  }
  myChart.setOption({
    xAxis: {
      name: xtitle,
      scale: true
    },
    yAxis: {
      name: ytitle,
      scale: true
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        symbolSize: 20,
        data: dataSet || [
          [10.0, 8.04],
          [8.07, 6.95],
          [13.0, 7.58],
          [9.05, 8.81],
          [11.0, 8.33],
          [14.0, 7.66],
          [13.4, 6.81],
          [10.0, 6.33],
          [14.0, 8.96],
          [12.5, 6.82],
          [9.15, 7.2],
          [11.5, 7.2],
          [3.03, 4.23],
          [12.2, 7.83],
          [2.02, 4.47],
          [1.05, 3.33],
          [4.05, 4.96],
          [6.03, 7.24],
          [12.0, 6.26],
          [12.0, 8.84],
          [7.08, 5.82],
          [5.02, 5.68]
        ],
        type: 'scatter'
      }
    ]
  })
}
onMounted(() => {
  myChart = echarts.init(chartRef.value)
  initChart()
})
watch(() => props.data, (percent, prevPercent) => {
  console.log('props.data update')
  console.log(props.data)
  initChart()
})
window.onresize = function () {
  // 自适应大小, 不用的话不会自适应大小。
  myChart.resize()
}
</script>

<template>
  <div
    ref="chartRef"
    class="echart-custom"
  />
</template>

<style scoped>

</style>
