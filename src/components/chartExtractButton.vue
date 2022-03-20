<script setup>
import { reactive, ref } from 'vue'
import { FileList } from '@/api/file'
import { ElMessage } from 'element-plus'
import { ChartCreate } from '@/api/chart'

const emit = defineEmits(['ok'])

const form = reactive({
  file_id: undefined
})
const visible = ref(false)
const selectFile = () => {
  visible.value = true
}
const cancelSelect = () => {
  console.log('cancel')
  visible.value = false
}
const confirmSelect = async () => {
  console.log('confirm')
  try {
    if (form.file_id) {
      await ChartCreate(form)
      // await getDataList()
      emit('ok')
      ElMessage.success('提取成功')
    } else {
      ElMessage.error('文件ID不存在')
    }
  } catch (err) {
    console.log(err)
    ElMessage.error('提取失败')
  }
}
const data = ref([])
const getDataList = async (params = baseParams) => {
  try {
    const res = await FileList(params)
    console.log(res)
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
const fileColumns = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '类型',
    dataIndex: 'type'
  }
]
const clickSelection = (rowKeys) => {
  console.log(rowKeys[0])
  form.file_id = rowKeys[0]
}

const baseParams = {
  page: 1,
  pageSize: 10
}
const pagination = reactive({
  current: baseParams.page,
  pageSize: baseParams.pageSize,
  showTotal: true,
  showJumper: false,
  showPageSize: false
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

const initPage = async () => {
  await getDataList()
}
initPage()
</script>

<template>
  <a-button
    type="primary"
    @click="selectFile"
  >
    <template #icon>
      <icon-plus />
    </template>
    图表提取
  </a-button>
  <a-modal
    v-model:visible="visible"
    title="表格选择"
    draggable
    width="50%"
    @cancel="cancelSelect"
    @ok="confirmSelect"
  >
    <a-table
      row-key="id"
      :columns="fileColumns"
      :data="data"
      :show-header="false"
      :row-selection="{type: 'radio'}"
      :pagination="pagination"
      @page-change="onPageChange"
      @page-size-change="onPageSizeChange"
      @select="clickSelection"
    />
    <a-form
      :model="form"
      style="margin-top: 20px"
    >
      <a-form-item
        field="file_id"
        label="文件 ID"
      >
        <a-input-number
          v-model="form.file_id"
          hide-button
          disabled
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>

</style>
