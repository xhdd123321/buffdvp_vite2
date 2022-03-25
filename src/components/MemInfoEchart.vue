<script setup>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

const scale = 0.78
// eslint-disable-next-line vue/no-setup-props-destructure
const echartData = ref([{ value: 0, name: '空闲' }, { value: 0, name: '已使用' }])

defineExpose({
  echartData
})

const rich = {
  yellow: {
    color: '#000D4D',
    fontSize: 30 * scale,
    padding: [5, 4],
    align: 'center'
  },
  total: {
    color: '#000D4D',
    fontSize: 40 * scale,
    align: 'center'
  },
  white: {
    color: '#6B7785',
    align: 'center',
    fontSize: 20 * scale,
    padding: [21, 0]
  },
  blue: {
    color: '#49dff0',
    fontSize: 16 * scale,
    align: 'center'
  },
  hr: {
    borderColor: '#0b5263',
    width: '100%',
    borderWidth: 1,
    height: 0
  }
}

const chartRef = ref(null)
const initChart = () => {
  const myChart = echarts.init(chartRef.value)
  myChart.setOption({
    backgroundColor: '#fff',
    title: {
      text: '总内存',
      left: 'center',
      top: '53%',
      padding: [24, 0],
      textStyle: {
        color: '#6B7785',
        fontSize: 18 * scale,
        align: 'center'
      }
    },
    legend: {
      selectedMode: false,
      formatter: function (name) {
        let total = 0
        echartData.value.forEach(function (value, index, array) {
          total += value.value
        })
        return '{total|' + total.toFixed(1) + 'G}'
      },
      data: [echartData.value[0].name],
      // data: ['高等教育学'],
      // itemGap: 50,
      left: 'center',
      top: 'center',
      icon: 'none',
      align: 'center',
      textStyle: {
        color: '#6B7785',
        fontSize: 16 * scale,
        rich: rich
      }
    },
    series: [
      {
        name: '内存监控',
        type: 'pie',
        radius: ['42%', '50%'],
        hoverAnimation: false,
        color: ['#94BFFF', '#0E42D2', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
        label: {
          normal: {
            formatter: function (params, ticket, callback) {
              let total = 0
              let percent = 0
              echartData.value.forEach(function (value, index, array) {
                total += value.value
              })
              percent = ((params.value / total) * 100).toFixed(1)
              return (
                '{white|' +
                  params.name +
                  '}\n{hr|}\n{yellow|' +
                  params.value + 'G' +
                  '}\n{blue|' +
                  percent +
                  '%}'
              )
            },
            rich: rich
          }
        },
        labelLine: {
          normal: {
            length: 55 * scale,
            length2: 0,
            lineStyle: {
              color: '#0b5263'
            }
          }
        },
        data: echartData.value
      }
    ]
  })
}
onMounted(() => {
  initChart()
})
watch(echartData.value, () => {
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
