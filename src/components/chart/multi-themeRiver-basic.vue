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
  for (let j = 0; j < xlist.length; j++) {
    const item = xlist[j]
    for (let i = 1; i < Object.keys(myData).length; i++) {
      data.push([j, Object.values(myData)[i][j], Object.keys(myData)[i]])
    }
  }
  console.log(data)
  myChart.setOption({
    legend: {},
    singleAxis: {
      max: 'dataMax'
    },
    series: [
      {
        type: 'themeRiver',
        data: data,
        label: {
          show: false
        }
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
