<script setup>
import { useRoute } from 'vue-router'
import { onBeforeMount, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { EchartCreate } from '@/api/echart'
import * as echarts from 'echarts'
const route = useRoute()
const id = route.query.id

const optionList = ref([])
const data = ref({})
const getDataDetail = async () => {
  try {
    const form = {
      chart_id: id
    }
    const res = await EchartCreate(form)
    data.value = res.data
    optionList.value = data.value.bar_list
    console.log(optionList.value)
  } catch (err) {
    console.log(err)
    data.value = {}
    ElMessage.error('列表获取失败')
  }
}
const itemRefs = ref([])
const setItemRefs = (el) => {
  if (el) {
    itemRefs.value.push(el)
  }
}
const initChart = async () => {
  console.log(itemRefs.value)
  const list = optionList.value
  for (const i in list) {
    console.log(itemRefs.value[i])
    const myChart = echarts.init(itemRefs.value[i])
    myChart.setOption(list[i])
  }
}
onMounted(() => {
  initPage()
})
const initPage = async () => {
  await getDataDetail()
  await initChart()
}

</script>

<template>
  <el-card
    class="box-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <span>可视化模块1</span>
      </div>
    </template>
    <div>
      <div
        v-for="(item, index) in optionList"
        :key="index"
        :ref="setItemRefs"
        :style="{ width: '100%', height: '300px' }"
      />
    </div></el-card>
</template>

<style scoped>

</style>
