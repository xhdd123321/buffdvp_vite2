<script setup>
import { FileCreate, FileDelete, FileList } from '@/api/file'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { downloadFile } from '@/utils/download'
import { ChartCreate } from '@/api/chart'

const loading = ref(true)
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
const columns = [
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

const onDownload = async (record) => {
  try {
    // await downloadWithUrl(record.file, record.name)
    await downloadFile(record.file, record.name)
    ElMessage.success('下载链接已建立，请等待下载完成')
  } catch (err) {
    console.log(err)
    ElMessage.error('下载失败')
  }
}
const onDelete = async (record) => {
  try {
    const id = record.id
    await FileDelete(id)
    await getDataList()
    ElMessage.success('删除成功')
  } catch (err) {
    console.log(err)
    ElMessage.error('删除失败')
  }
}
const onExtract = async (record) => {
  try {
    const form = {
      file_id: record.id
    }
    await ChartCreate(form)
    ElMessage.success('提取成功')
  } catch (err) {
    console.log(err)
    ElMessage.error('提取失败')
  }
}
const customRequest = async (option) => {
  try {
    const { fileItem } = option
    const formData = new FormData()
    formData.append('file', fileItem.file)
    await FileCreate(formData)
    await getDataList()
    ElMessage.success('文件上传成功')
  } catch (err) {
    console.log(err)
    ElMessage.error('文件上传失败')
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
        <span>文件列表</span>
      </div>
    </template>
    <div>
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-upload
              :custom-request="customRequest"
              :show-file-list="false"
            >
              <template #upload-button>
                <a-button type="primary">
                  <template #icon>
                    <icon-plus />
                  </template>
                  文件上传
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :columns="columns"
        :data="data"
        :pagination="pagination"
        @page-change="onPageChange"
        @page-size-change="onPageSizeChange"
      >
        <template #optional="{ record }">
          <a-space>
            <a-popconfirm
              content="确定要提取吗?"
              @ok="onExtract(record)"
            >
              <a-button shape="round">
                <icon-translate />
              </a-button>
            </a-popconfirm>
            <a-popconfirm
              content="确定要下载吗?"
              @ok="onDownload(record)"
            >
              <a-button shape="round">
                <icon-download />
              </a-button>
            </a-popconfirm>
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
