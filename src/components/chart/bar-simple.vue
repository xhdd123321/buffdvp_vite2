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
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }
    },
    xAxis: {
      type: 'category',
      data: datax,
      name: title
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: datay || [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
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
