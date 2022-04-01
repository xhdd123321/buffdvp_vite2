<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import ecStat from 'echarts-stat'
echarts.registerTransform(ecStat.transform.regression)

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
    dataset: [
      {
        source: dataSet || [
          [1, 4862.4],
          [2, 5294.7],
          [3, 5934.5],
          [4, 7171.0],
          [5, 8964.4],
          [6, 10202.2],
          [7, 11962.5],
          [8, 14928.3],
          [9, 16909.2],
          [10, 18547.9],
          [11, 21617.8],
          [12, 26638.1],
          [13, 34634.4],
          [14, 46759.4],
          [15, 58478.1],
          [16, 67884.6],
          [17, 74462.6],
          [18, 79395.7]
        ]
      },
      {
        transform: {
          type: 'ecStat:regression',
          config: {
            method: 'exponential'
            // 'end' by default
            // formulaOn: 'start'
          }
        }
      }
    ],
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      name: xtitle,
      scale: true,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    yAxis: {
      name: ytitle,
      scale: true,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: 'scatter',
        type: 'scatter',
        datasetIndex: 0
      },
      {
        name: 'line',
        type: 'line',
        smooth: true,
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: 'circle',
        label: { show: true, fontSize: 16 },
        labelLayout: { dx: -20 },
        encode: { label: 2, tooltip: 1 }
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
