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
  const datax = ['total']
  const datay = [0]
  for (const key in content) {
    datax.push(key)
    datay.push(content[key])
    datay[0] += content[key]
  }
  const datayReserve = [0]
  let total = datay[0]
  for (const key in content) {
    total -= content[key]
    datayReserve.push(total)
  }
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        const tar = params[1]
        return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value
      }
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      splitLine: { show: false },
      data: datax
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'Total',
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent'
        },
        emphasis: {
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          }
        },
        data: datayReserve
      },
      {
        name: 'Count',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'inside'
        },
        data: datay
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
