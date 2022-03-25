<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { EchartCreate } from '@/api/echart'
import * as echarts from 'echarts'
import { ChartRetrieve } from '@/api/chart'
const route = useRoute()
const id = route.query.id
const loading = ref(true)

const barList = ref([])
const pieList = ref([])
const data = ref({})
const originData = ref({})
const getDataDetail = async () => {
  try {
    const resOrigin = await ChartRetrieve(id)
    originData.value = resOrigin.data

    const form = {
      chart_id: id
    }
    const res = await EchartCreate(form)
    data.value = res.data
    barList.value = data.value.bar_list
    pieList.value = data.value.pie_list
  } catch (err) {
    console.log(err)
    data.value = {}
    ElMessage.error('列表获取失败')
  }
}

const header = ref(undefined)
const body = ref(undefined)
const showData = ref([])
const setShowData = async (data) => {
  header.value = data.header
  delete data.header
  body.value = data.body
  delete data.body
  for (const key in data) {
    showData.value.push({
      label: key,
      value: data[key]
    })
  }
}
const tableColumns = ref([])
const tableData = ref([])
const setTableData = async (header, body) => {
  console.log(header)
  console.log(body)
  let temp = []
  for (const i in header) {
    temp.push({
      title: header[i],
      dataIndex: i,
      sortable: {
        sortDirections: ['ascend', 'descend']
      }
    })
  }
  tableColumns.value = temp
  temp = []
  for (const row of body) {
    const obj = {}
    for (const i in row) {
      obj[i] = row[i]
    }
    temp.push(obj)
  }
  tableData.value = temp
  console.log(tableColumns.value)
  console.log(tableData.value)
}

const BarRefs = ref([])
const PieRefs = ref([])
const setBarRefs = (el) => {
  if (el) {
    BarRefs.value.push(el)
  }
}
const setPieRefs = (el) => {
  if (el) {
    PieRefs.value.push(el)
  }
}
const initBar = async () => {
  const list = barList.value
  for (const i in list) {
    const myChart = echarts.init(BarRefs.value[i])
    myChart.setOption(list[i])
  }
}
const initPie = async () => {
  const list = pieList.value
  for (const i in list) {
    const myChart = echarts.init(PieRefs.value[i])
    myChart.setOption(list[i])
  }
}
const initChart = async () => {
  initBar()
  initPie()
  // window.addEventListener('resize', () => {
  //   // 页面大小变化后Echarts也更改大小
  //   myChart.resize()
  // })
}
onMounted(() => {
  initPage()
})
const initPage = async () => {
  loading.value = true
  await getDataDetail()
  await setShowData(originData.value)
  await setTableData(header.value, body.value)
  await initChart()
  loading.value = false
}
const activeNames = ref(['1', '2'])
</script>

<template>
  <el-card
    v-loading="loading"
    element-loading-text="分析中..."
    class="box-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <span>可视化结果</span>
      </div>
    </template>
    <el-collapse v-model="activeNames">
      <el-collapse-item
        title="原始数据"
        name="0"
      >
        <a-table
          :columns="tableColumns"
          :data="tableData"
          :pagination="false"
        />
      </el-collapse-item>
      <el-collapse-item
        title="柱状图统计"
        name="1"
      >
        <el-card
          class="box-card"
          shadow="hover"
        >
          <div class="content">
            <div
              v-for="(item, index) in barList"
              :key="index"
              :ref="setBarRefs"
              :style="{ width: '450px', height: '300px' }"
            />
          </div>
        </el-card>
      </el-collapse-item>
      <el-collapse-item
        title="饼图统计"
        name="2"
      >
        <el-card
          class="box-card"
          shadow="hover"
        >
          <div class="content">
            <div
              v-for="(item, index) in pieList"
              :key="index"
              :ref="setPieRefs"
              :style="{ width: '450px', height: '300px' }"
            />
          </div>
        </el-card>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<style scoped>
.content{
  display: flex;
  flex-wrap: wrap;
}
</style>
