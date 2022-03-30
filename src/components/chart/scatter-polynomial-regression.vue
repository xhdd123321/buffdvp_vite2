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
        source: dataSet
      },
      {
        transform: {
          type: 'ecStat:regression',
          config: { method: 'polynomial', order: 3 }
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
      },
      splitNumber: 20
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
        type: 'scatter'
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
</script>

<template>
  <div
    ref="chartRef"
    :style="{ width: '960px', height: '540px' }"
  />
</template>

<style scoped>

</style>
