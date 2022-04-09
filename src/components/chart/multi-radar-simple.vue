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
  const xlist = Object.values(myData)[0]
  const data = []
  for (let i = 1; i < Object.keys(myData).length; i++) {
    data.push({
      name: Object.keys(myData)[i],
      value: Object.values(myData)[i]
    })
  }
  const indicator = []
  for (const item of xlist) {
    indicator.push({
      name: item
    })
  }
  myChart.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }
    },
    radar: {
      // shape: 'circle',
      indicator: indicator
    },
    series: [
      {
        name: xtitle,
        type: 'radar',
        data: data || [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: 'Allocated Budget'
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: 'Actual Spending'
          }
        ]
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
