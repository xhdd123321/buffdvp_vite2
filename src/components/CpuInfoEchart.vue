<script setup>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

const percent = ref(0)

defineExpose({
  percent
})

const chartRef = ref(null)
const initChart = () => {
  const myChart = echarts.init(chartRef.value)
  console.log(percent.value)
  myChart.setOption({
    series: [
      {
        type: 'gauge',
        radius: '80%',
        progress: {
          show: true,
          width: 18
        },
        axisLine: {
          lineStyle: {
            width: 18
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          length: 15,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        axisLabel: {
          show: false,
          distance: 25,
          color: '#999',
          fontSize: 10
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 13,
          itemStyle: {
            borderWidth: 5
          }
        },
        pointer: {
          show: true,
          length: '50%',
          width: 4
        },
        title: {
          fontSize: 13,
          show: true,
          offsetCenter: [0, '80%']
        },
        detail: {
          valueAnimation: true,
          fontSize: 30,
          offsetCenter: [0, '50%'],
          formatter: '{value}%'
        },
        data: [
          {
            value: percent.value,
            name: 'CPU使用率',
            detail: {
              valueAnimation: true,
              fontSize: 16,
              offsetCenter: [0, '50%'],
              formatter: '{value}%'
            }
          }
        ]
      }
    ]
  })
}
onMounted(() => {
  initChart()
})
watch(percent, (percent, prevPercent) => {
  console.log('percent')
  initChart()
})
</script>

<template>
  <div
    ref="chartRef"
    :style="{ width: '450px', height: '300px' }"
  />
</template>

<style scoped>

</style>
