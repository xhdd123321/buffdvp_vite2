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
  myChart.setOption({
    xAxis: {
      name: xtitle,
      type: 'category',
      data: xlist
    },
    yAxis: {
      name: ytitle,
      type: 'value'
    },
    series: [
      {
        data: ylist,
        type: 'line',
        smooth: true
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
