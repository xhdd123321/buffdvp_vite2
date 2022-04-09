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
  const series = []
  for (let i = 1; i < Object.keys(myData).length; i++) {
    series.push({
      name: Object.keys(myData)[i],
      type: 'bar',
      data: Object.values(myData)[i],
      coordinateSystem: 'polar',
      roundCap: true,
      itemStyle: {
        opacity: 0.8,
        borderWidth: 1
      }
    })
  }
  myChart.setOption({
    angleAxis: {
      startAngle: 30,
      splitLine: {
        show: false
      }
    },
    radiusAxis: {
      type: 'category',
      data: xlist,
      name: xtitle,
      z: 10
    },
    polar: {},
    series: series || [
      {
        type: 'bar',
        data: [4, 3, 2, 1, 0],
        coordinateSystem: 'polar',
        name: 'Without Round Cap',
        itemStyle: {
          borderColor: 'red',
          opacity: 0.8,
          borderWidth: 1
        }
      },
      {
        type: 'bar',
        data: [4, 3, 2, 1, 0],
        coordinateSystem: 'polar',
        name: 'With Round Cap',
        roundCap: true,
        itemStyle: {
          borderColor: 'green',
          opacity: 0.8,
          borderWidth: 1
        }
      }
    ],
    legend: {}
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
