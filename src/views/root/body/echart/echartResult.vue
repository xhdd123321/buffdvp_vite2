<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { EchartCreate } from '@/api/echart'
import VChart from 'vue-echarts'
const route = useRoute()
const id = route.query.id

const data = ref({})
const getDataDetail = async () => {
  try {
    const form = {
      chart_id: id
    }
    const res = await EchartCreate(form)
    data.value = res.data
    console.log(data.value)
  } catch (err) {
    console.log(err)
    data.value = {}
    ElMessage.error('列表获取失败')
  }
}

const option = ref()
const initPage = async () => {
  await getDataDetail()
  console.log(data.value.bar_list[0])
  option.value = data.value.bar_list[0]
}
initPage()
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
      <el-skeleton :rows="5" />
      <v-chart
        class="chart"
        :option="option"
      />
    </div>
  </el-card>
</template>

<style scoped>

</style>
