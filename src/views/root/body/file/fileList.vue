<script setup>
import { FileCreate, FileDelete, FileList } from '@/api/file'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { downloadFile } from '@/utils/download'

const data = ref([])
const getDataList = async () => {
  try {
    const res = await FileList()
    console.log(res)
    data.value = res.data.results
    console.log(data.value)
  } catch (err) {
    console.log(err)
    data.value = []
    ElMessage.error('列表获取失败')
  }
}
getDataList()
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
    ElMessage.error('文件下载失败')
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
    ElMessage.error('文件删除失败')
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

</script>

<template>
  <el-card
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
        :columns="columns"
        :data="data"
      >
        <template #optional="{ record }">
          <a-space>
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
