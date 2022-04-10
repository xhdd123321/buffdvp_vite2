<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { ChartExport } from '@/api/chart'
import { convertRes2Blob } from '@/utils/download'

const form = ref({})
const visible = ref(false)
const id = ref(0)
const selectChart = async (record) => {
  id.value = record
  visible.value = true
}
defineExpose({ selectChart })

const getExport = async () => {
  try {
    const res = await ChartExport(id.value, form.value)
    convertRes2Blob(res)
    ElMessage.success('导出成功，请等待下载完成')
  } catch (err) {
    console.log(err)
    ElMessage.error('导出失败')
  }
}

const handleCancel = () => {
  console.log('cancel')
  visible.value = false
}
const confirmSelect = async () => {
  console.log('confirm')
  visible.value = false
  await getExport()
}
</script>

<template>
  <a-modal
    v-model:visible="visible"
    title="图表导出"
    @cancel="handleCancel"
    @ok="confirmSelect"
  >
    <a-form :model="form">
      <a-form-item
        field="type"
        label="导出类型"
      >
        <a-select v-model="form.type">
          <a-option value="excel">Excel</a-option>
          <a-option value="csv">CSV</a-option>
          <a-option value="txt">TXT</a-option>
          <a-option value="json">Json</a-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>

</style>
