<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { UserDelete, UserList } from '@/api/user'
import UserDetailAdmin from '@/components/UserDetailAdmin.vue'

const data = ref([])
const modelRef = ref(null)
const getDataList = async (params = baseParams) => {
  try {
    const res = await UserList(params)
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
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: '昵称',
    dataIndex: 'nick_name'
  },
  {
    title: '是否为管理员',
    dataIndex: 'is_superuser'
  },
  {
    title: '最后登录时间',
    dataIndex: 'last_login'
  },
  {
    title: '操作',
    slotName: 'optional',
    align: 'center'
  }
]

const onDelete = async (record) => {
  try {
    const id = record.id
    await UserDelete(id)
    await getDataList()
    ElMessage.success('删除成功')
  } catch (err) {
    console.log(err)
    ElMessage.error('删除失败')
  }
}

const onDetail = (record) => {
  const id = record.id
  modelRef.value.selectUser(id)
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

const onUserUpdateOk = () => {
  getDataList()
}

const initPage = async () => {
  await getDataList()
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
        <span>管理员用户管理模块</span>
      </div>
    </template>
    <div>
      <UserDetailAdmin
        ref="modelRef"
        @ok="onUserUpdateOk"
      />
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
