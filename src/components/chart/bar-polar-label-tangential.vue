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
  const title = myData?.title
  const content = myData?.content
  const datax = []
  const datay = []
  for (const key in content) {
    datax.push(key)
    datay.push(content[key])
  }
  myChart.setOption({
    polar: {
      radius: [30, '80%']
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }
    },
    angleAxis: {
      max: 4,
      startAngle: 75
    },
    radiusAxis: {
      type: 'category',
      data: datax
    },
    tooltip: {},
    series: {
      type: 'bar',
      data: datay,
      coordinateSystem: 'polar',
      label: {
        show: true,
        position: 'middle',
        formatter: '{b}: {c}'
      }
    }
  })
}
onMounted(() => {
  myChart = echarts.init(chartRef.value)
  initChart()
})
watch(() => props.data, (percent, prevPercent) => {
  console.log('props.data update')
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
