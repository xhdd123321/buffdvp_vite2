<script setup>
import { getDashboardData } from '@/api/dashboard'
import { ElMessage } from 'element-plus'
import { getCurrentInstance, onBeforeUnmount, ref, onMounted } from 'vue'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'vue-router'
import { Modal } from '@arco-design/web-vue'
import MemInfoEchart from '@/components/MemInfoEchart.vue'
import CpuInfoEchart from '@/components/CpuInfoEchart.vue'

import * as echarts from 'echarts'
const router = useRouter()
const loading = ref(true)
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

const showIntroduction = () => {
  Modal.info({
    title: '简介',
    content: 'BUFFDVP是一个基于Echarts+pandas的数据可视化分析平台，DVP即数据可视化平台Data visualization platform的缩写，BUFF则是游戏术语，指代游戏的中各种增益效果。BUFFDVP即为对可视化平台加上一个BUFF，让平台获得强力的增益效果！'
  })
}

const memchart = ref(undefined)
const cpuchart = ref(undefined)
const initChart = async () => {
  if (memchart.value) {
    memchart.value.echartData[0].value = dashboardData.value.memInfo.free
    memchart.value.echartData[1].value = dashboardData.value.memInfo.used
  }
  if (cpuchart.value) {
    cpuchart.value.percent = dashboardData.value.cpuInfo.percent
  }
}
const initPage = async () => {
  await fetchData()
  await initChart()
  loading.value = false
}

initPage()
const timer = setInterval(initPage, 2000)
onBeforeUnmount(() => {
  clearInterval(timer)
})

</script>

<template>
  <el-row :gutter="24">
    <el-col :span="16">
      <el-card
        v-loading="loading"
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
                  >{{ dashboardData?.siteInfo.onlineCount || 0 }}</span> 人</div>
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
                  >{{ dashboardData?.siteInfo.registeredCount || 0 }}</span> 人</div>
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
                  >{{ dashboardData?.siteInfo.siteRuntime || 0 }}</span> 天</div>
                </el-space>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card
        v-loading="loading"
        class="box-card"
        shadow="hover"
      >
        <template #header>
          <div class="card-header">
            <span>性能监控</span>
          </div>
        </template>
        <a-row
          style="margin-bottom: 30px"
          :gutter="24"
        >
          <a-col :span="8">
            <a-space
              direction="vertical"
              fill
            >
              <div class="arco-statistic-title">服务器系统</div>
              <a-tag
                style="width: 80%"
                color="arcoblue"
              >{{ dashboardData?.sysInfo.platform || 'unknown' }}</a-tag>
            </a-space>
          </a-col>
          <a-col :span="8">
            <a-statistic
              title="Logical CPU"
              :value="dashboardData?.cpuInfo.count_logical || 0"
              show-group-separator
            />
          </a-col>
          <a-col :span="8">
            <a-statistic
              title="Physical CPU"
              :value="dashboardData?.cpuInfo.count_phy || 0"
              show-group-separator
            />
          </a-col>
        </a-row>
        <a-divider />
        <a-row
          style="margin-bottom: 30px"
          :gutter="24"
        >
          <a-col :span="12">
            <a-statistic
              title="接受数据字节"
              :value="dashboardData?.netInfo.bytes_recv || 0"
              show-group-separator
            >
              <template #prefix>
                <icon-arrow-rise />
              </template>
              <template #suffix>
                bytes
              </template>
            </a-statistic>
          </a-col>
          <a-col :span="12">
            <a-statistic
              title="发送数据字节"
              :value="dashboardData?.netInfo.bytes_recv || 0"
              show-group-separator
            >
              <template #prefix>
                <icon-arrow-rise />
              </template>
              <template #suffix>
                bytes
              </template>
            </a-statistic>
          </a-col>
        </a-row>
        <a-divider />
        <div class="chart-map">
          <a-row>
            <a-col :span="12">
              <MemInfoEchart ref="memchart" />
            </a-col>
            <a-col :span="12">
              <CpuInfoEchart ref="cpuchart" />
            </a-col>
          </a-row>
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
            class="notice"
            shadow="hover"
          >
            <el-space>
              <a-tag color="arcoblue">通知</a-tag>
              <span>4 月新系统升级计划通知</span>
            </el-space>
          </el-card>
          <el-card
            class="notice"
            shadow="hover"
          >
            <el-space>
              <a-tag color="orangered">活动</a-tag>
              <span>内容最新优惠活动</span>
            </el-space>
          </el-card>
          <el-card
            class="notice"
            shadow="hover"
          >
            <el-space>
              <a-tag color="cyan">通知</a-tag>
              <span>新增内容已经通过审核，详情请前往通知中心查看</span>
            </el-space>
          </el-card>
          <el-card
            class="notice"
            shadow="hover"
          >
            <el-space>
              <a-tag color="arcoblue">通知</a-tag>
              <span>1 月新系统升级计划通知</span>
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
          <div
            class="divider-demo"
          >
            <a-button
              type="secondary"
              shape="round"
              long
              @click="showIntroduction"
            >
              <template #icon>
                <icon-bulb />
              </template>
              平台简介
            </a-button>
            <a-divider class="half-divider" />
            <a-button
              type="primary"
              shape="round"
              long
              @click="router.push({name:'quickStart'})"
            >
              <template #icon>
                <icon-bulb />
              </template>
              快速开始
            </a-button>
            <a-divider class="half-divider" />
            <a-button
              type="primary"
              shape="round"
              long
              @click="router.push({name:'visualGuide'})"
            >
              <template #icon>
                <icon-bulb />
              </template>
              可视化指南
            </a-button>
          </div>
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
.chart-map{
  display: flex;
}

.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-box .avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  color: var(--color-text-2);
  font-size: 16px;
  background-color: var(--color-fill-3);
  border-radius: 50%;
}
.flex-box .content {
  flex: 1;
  color: var(--color-text-2);
  font-size: 12px;
  line-height: 20px;
}
</style>
