<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import 'echarts-wordcloud'

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
  const dataList = []
  for (const key in content) {
    dataList.push({
      value: content[key],
      name: key
    })
  }
  myChart.setOption({
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }
    },
    series: [{
      type: 'wordCloud',

      // The shape of the "cloud" to draw. Can be any polar equation represented as a
      // callback function, or a keyword present. Available presents are circle (default),
      // cardioid (apple or heart shape curve, the most known polar equation), diamond (
      // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

      shape: 'circle',

      // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
      // Default to be put in the center and has 75% x 80% size.

      left: 'center',
      top: 'center',
      width: '70%',
      height: '80%',
      right: null,
      bottom: null,

      // Text size range which the value in data will be mapped to.
      // Default to have minimum 12px and maximum 60px size.

      sizeRange: [12, 60],

      // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

      rotationRange: [-90, 90],
      rotationStep: 45,

      // size of the grid in pixels for marking the availability of the canvas
      // the larger the grid size, the bigger the gap between words.

      gridSize: 8,

      // set to true to allow word being draw partly outside of the canvas.
      // Allow word bigger than the size of the canvas to be drawn
      drawOutOfBound: false,

      // If perform layout animation.
      // NOTE disable it will lead to UI blocking when there is lots of words.
      layoutAnimation: true,

      // Global text style
      textStyle: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        // Color can be a callback function or a color string
        color: function () {
        // Random color
          return 'rgb(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(',') + ')'
        }
      },
      emphasis: {
        focus: 'self',

        textStyle: {
          textShadowBlur: 10,
          textShadowColor: '#333'
        }
      },

      // Data is an array. Each array item must have name and value property.
      data: dataList || [{
        name: 'Farrah Abraham',
        value: 366,
        // Style of single text
        textStyle: {
        }
      }]
    }]
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
