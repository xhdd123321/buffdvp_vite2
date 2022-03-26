<script setup>
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import { ChartDelete, ChartList } from '@/api/chart'
import ChartExtractButton from '@/components/chartExtractButton.vue'
import ChartExportModal from '@/components/ChartExportModal.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const loading = ref(true)

const data = ref([])
const modelRef = ref(null)
const getDataList = async (params = baseParams) => {
  try {
    const res = await ChartList(params)
    data.value = res.data.results
    pagination.total = res.data.count
    pagination.current = params.page
    pagination.pageSize = params.pageSize
    console.log(data.value)
  } catch (err) {
    console.log(err)
    data.value = []
    ElMessage.error('列表获取失败')
  }
}
const columns = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '所属用户',
    dataIndex: 'user'
  },
  {
    title: '创建时间',
    dataIndex: 'create_time'
  },
  {
    title: '操作',
    slotName: 'optional',
    align: 'center'
  }
]
const onDetail = (record) => {
  router.push({ name: 'chartDetail', params: { id: record.id } })
}
const onExport = (record) => {
  modelRef.value.selectChart(record.id)
}
const onDelete = async (record) => {
  try {
    const id = record.id
    await ChartDelete(id)
    await getDataList()
    ElMessage.success('删除成功')
  } catch (err) {
    console.log(err)
    ElMessage.error('删除失败')
  }
}

const baseParams = {
  page: 1,
  pageSize: 10
}
const pagination = reactive({
  current: baseParams.page,
  pageSize: baseParams.pageSize,
  showTotal: true,
  showJumper: true,
  showPageSize: true
})
const onPageChange = (page) => {
  console.log(page)
  baseParams.page = page
  getDataList(baseParams)
}
const onPageSizeChange = (pageSize) => {
  console.log(pageSize)
  baseParams.page = 1
  baseParams.pageSize = pageSize
  getDataList(baseParams)
}

const onChartExtractOk = () => {
  getDataList()
}

const initPage = async () => {
  loading.value = true
  await getDataList()
  loading.value = false
}
initPage()
</script>

<template>
  <el-card
    v-loading="loading"
    class="box-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <span>图表列表</span>
      </div>
    </template>
    <div>
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <ChartExtractButton @ok="onChartExtractOk" />
          </a-space>
        </a-col>
      </a-row>
      <ChartExportModal ref="modelRef" />
      <a-table
        :columns="columns"
        :data="data"
        row-key="id"
        :pagination="pagination"
        @page-change="onPageChange"
        @page-size-change="onPageSizeChange"
      >
        <template #optional="{ record }">
          <a-space>
            <a-button
              shape="round"
              @click="onDetail(record)"
            >
              <icon-info-circle />
            </a-button>
            <a-button
              shape="round"
              @click="onExport(record)"
            >
              <icon-export />
            </a-button>
            <a-popconfirm
              content="确定要删除吗?"
              @ok="onDelete(record)"
            >
              <a-button shape="round">
                <icon-delete />
              </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </div>
  </el-card>
</template>

<style scoped>

</style>
