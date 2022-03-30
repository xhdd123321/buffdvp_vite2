<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { ChartRetrieve } from '@/api/chart'
import { ElMessage } from 'element-plus'
const route = useRoute()
const router = useRouter()
const loading = ref(true)
const id = route.params.id
console.log(id)

const data = ref({})
const getDataDetail = async () => {
  try {
    const res = await ChartRetrieve(id)
    data.value = res.data
    console.log(data.value)
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

const autoANA = () => {
  router.push({ name: 'echartResult', query: { id: id } })
}

const statisANA = () => {
  router.push({ name: 'echartResult', query: { id: id } })
}

const customANA = () => {
  router.push({ name: 'echartCustom', params: { id: id, title: data.value?.title } })
}

const initPage = async () => {
  loading.value = true
  await getDataDetail()
  await setShowData(data.value)
  await setTableData(header.value, body.value)
  loading.value = false
}
initPage()
</script>

<template>
  <el-card
    v-loading="loading"
    class="box-card"
    shadow="hover"
    element-loading-text="加载中..."
  >
    <template #header>
      <div class="card-header">
        <span>图表详情</span>
      </div>
    </template>
    <div>
      <div>
        <a-row justify="space-between">
          <a-col :span="18">
            <h3>基本信息</h3>
            <a-descriptions
              :data="showData"
              :column="1"
            />
          </a-col>
          <a-col
            :span="6"
            style="text-align: end"
          >
            <a-button
              class="button"
              type="primary"
              long
              @click="autoANA"
            >
              <template #icon>
                <icon-bar-chart />
              </template>
              自动分析
            </a-button>
            <a-button
              class="button"
              type="primary"
              long
              @click="statisANA"
            >
              <template #icon>
                <icon-bar-chart />
              </template>
              统计分析
            </a-button>
            <a-button
              class="button"
              type="primary"
              long
              @click="customANA"
            >
              <template #icon>
                <icon-bar-chart />
              </template>
              自定义分析
            </a-button>
          </a-col>
        </a-row>
      </div>
      <div>
        <h3>表格信息</h3>
        <a-table
          :columns="tableColumns"
          :data="tableData"
          :pagination="false"
        />
      </div>
    </div>
  </el-card>
</template>

<style scoped>
button {
  margin-bottom: 20px;
}
</style>
