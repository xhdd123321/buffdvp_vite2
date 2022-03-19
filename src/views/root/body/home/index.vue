<script setup>
import { getDashboardData } from '@/api/dashboard'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useUserStore } from '@/store/userStore'

const userStore = useUserStore()
const dashboardData = ref()
const fetchData = async () => {
  try {
    const res = await getDashboardData()
    dashboardData.value = res.data
    console.log(dashboardData.value)
  } catch (err) {
    console.log(err)
    ElMessage.error('获取主页信息失败')
  }
}
fetchData()
</script>

<template>
  <el-row gutter="24">
    <el-col :span="16">
      <el-card
        class="box-card"
        shadow="hover"
      >
        <template #header>
          <div class="card-header">
            <span>欢迎回来，{{ userStore?.nick_name }}</span>
          </div>
        </template>
        <div>
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover">
                <el-space direction="vertical">
                  <div>当前在线人数</div>
                  <div><span
                    class="number"
                    style="color: #F56C6C"
                  >{{ dashboardData?.onlineCount || 0 }}</span> 人</div>
                </el-space>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-space direction="vertical">
                  <div>站点注册用户</div>
                  <div><span
                    class="number"
                    style="color: #67C23A"
                  >{{ dashboardData?.registeredCount || 0 }}</span> 人</div>
                </el-space>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <el-space direction="vertical">
                  <div>站点运行时间</div>
                  <div><span
                    class="number"
                    style="color: #E6A23C"
                  >{{ dashboardData?.siteRuntime || 0 }}</span> 天</div>
                </el-space>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card
        class="box-card"
        shadow="hover"
      >
        <template #header>
          <div class="card-header">
            <span>内容数据</span>
          </div>
        </template>
        <div>
          <el-skeleton :rows="12" />
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card
        class="box-card"
        shadow="hover"
      >
        <template #header>
          <div class="card-header">
            <span>最新通知</span>
          </div>
        </template>
        <div>
          <el-card
            v-for="o in 4"
            :key="o"
            class="notice"
            shadow="hover"
          >
            <el-space>
              <el-icon><tickets /></el-icon>
              <span>这是第 {{ o }} 条通知。 This is the {{ o }} notice.</span>
            </el-space>
          </el-card>
        </div>
      </el-card>
      <el-card
        class="box-card"
        shadow="hover"
      >
        <template #header>
          <div class="card-header">
            <span>帮助文档</span>
          </div>
        </template>
        <div>
          <el-skeleton :rows="6" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.number{
  font-size: 32px;
}
.notice {
  margin-bottom: 20px;
}
.box-card {
  margin-bottom: 24px;
}
</style>
