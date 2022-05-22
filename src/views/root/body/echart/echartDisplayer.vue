<script setup>
import { AnaGetCompare, AnaGetCount, AnaGetList } from '@/api/echart'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { ChartList, ChartRetrieve } from '@/api/chart'
import { useRoute } from 'vue-router'
import PieBorderRadius from '@/components/chart/pie-borderRadius.vue'
import PieSimple from '@/components/chart/pie-simple.vue'
import PieRoseTypeSimple from '@/components/chart/pie-roseType-simple.vue'
import PieDoughnut from '@/components/chart/pie-doughnut.vue'
import BarSimple from '@/components/chart/bar-simple.vue'
import BarPolarLabelRadial from '@/components/chart/bar-polar-label-radial.vue'
import BarPolarLabelTangential from '@/components/chart/bar-polar-label-tangential.vue'
import BarWaterfall from '@/components/chart/bar-waterfall.vue'
import ScatterExponentialRegression from '@/components/chart/scatter-exponential-regression.vue'
import ScatterSimple from '@/components/chart/scatter-simple.vue'
import ScatterLinearRegression from '@/components/chart/scatter-linear-regression.vue'
import ScatterPolynomialRegression from '@/components/chart/scatter-polynomial-regression.vue'
import WordcloudSimple from '@/components/chart/wordcloud-simple.vue'
import LineSimple from '@/components/chart/line-simple.vue'
import LineSmooth from '@/components/chart/line-smooth.vue'
import AreaBasic from '@/components/chart/area-basic.vue'
import LinePolar from '@/components/chart/line-polar.vue'
import MultiRadarSimple from '@/components/chart/multi-radar-simple.vue'
import MultiLineSimple from '@/components/chart/multi-line-simple.vue'
import MultiBarYCategory from '@/components/chart/multi-bar-y-category.vue'
import MultiThemeRiverBasic from '@/components/chart/multi-themeRiver-basic.vue'
import MultiBarYCategoryStack from '@/components/chart/multi-bar-y-category-stack.vue'
import MultiAreaStack from '@/components/chart/multi-area-stack.vue'
import MultiLineStep from '@/components/chart/multi-line-step.vue'
import MultiBarPolarStackRadial from '@/components/chart/multi-bar-polar-stack-radial.vue'
import MultiBarPolarStack from '@/components/chart/multi-bar-polar-stack.vue'
import MultiPolarRoundCap from '@/components/chart/multi-polar-roundCap.vue'

const dataSetloading = ref(false)
const route = useRoute()

const chartTitle = ref(undefined)
const data = ref(undefined)
const countDataA = ref(undefined)
const countDataB = ref(undefined)
const countDataC = ref(undefined)
const countDataD = ref(undefined)
const listDataA = ref(undefined)
const listDataB = ref(undefined)
const listDataC = ref(undefined)
const listDataD = ref(undefined)
const compareDataA = ref(undefined)
const getDataList = async (chartId) => {
  dataSetloading.value = true
  try {
    const form = {
      chart_id: chartId
    }
    const resChart = await ChartRetrieve(chartId)
    chartTitle.value = resChart.data.title
    const resCount = await AnaGetCount(form)
    countDataA.value = resCount.data[0]
    countDataB.value = resCount.data[1] || countDataA.value
    countDataC.value = resCount.data[2] || countDataB.value
    countDataD.value = resCount.data[3] || countDataC.value
    const resList = await AnaGetList(form)
    listDataA.value = resList.data[0]
    listDataB.value = resList.data[1] || listDataA.value
    listDataC.value = resList.data[2] || listDataB.value
    listDataD.value = resList.data[3] || listDataC.value
    const resCompare = await AnaGetCompare(form)
    const temp = {}
    console.log(resCompare)
    const keyList = resCompare.data.key_list
    const contentList = resCompare.data.content_list
    console.log(keyList)
    console.log(contentList)
    Object.assign(temp, keyList[0])
    for (const item of contentList) {
      Object.assign(temp, item)
    }
    console.log(temp)
    compareDataA.value = temp
  } catch (err) {
    console.log(err)
    ElMessage.error('分析数据获取失败')
  }
  dataSetloading.value = false
}

const templateNum = ref(1)
const templateSelect = (num) => {
  if (!chartValue.value && num !== 0) {
    ElMessage.warning('请选择数据集')
    return
  }
  templateNum.value = num
}

const chartValue = ref(undefined)
const chartDataItem = ref(undefined)
const charList = ref([])
const getChartList = async () => {
  try {
    const res = await ChartList({
      page: 1,
      pageSize: 100
    })
    charList.value = res.data.results
    console.log(charList.value)
  } catch (err) {
    console.log(err)
    ElMessage.error('分析数据获取失败')
  }
}
const chartChange = async () => {
  console.log(chartValue.value)
  await getDataList(chartValue.value)
  data.value = undefined
  chartDataItem.value = undefined
}

const initPage = async () => {
  await getChartList()
  console.log(route.params)
  if (route.params?.id) {
    chartValue.value = route.params.id
    chartChange()
  } else if (route.query?.id) {
    chartValue.value = route.query.id
    chartChange()
  }
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
        <span>大屏可视化</span>
      </div>
    </template>
    <div>
      <a-row :gutter="24">
        <a-col :span="10">
          <a-space
            direction="vertical"
            fill
            size="large"
          >
            <a-select
              v-model="chartValue"
              :style="{width:'70%'}"
              placeholder="Please select chart..."
              @change="chartChange"
            >
              <a-option
                v-for="item of charList"
                :key="item.id"
                :value="item.id"
                :label="item.id + ' ' + item.title"
              />
            </a-select>
          </a-space>
        </a-col>
        <a-col :span="14">
          <a-space
            direction="vertical"
          >
            <a-space>
              <a-button
                type="primary"
                @click="templateSelect(1)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>模板A</template>
              </a-button>
              <a-button
                type="primary"
                @click="templateSelect(2)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>模板B</template>
              </a-button>
              <a-button
                type="primary"
                @click="templateSelect(3)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>模板C</template>
              </a-button>
            </a-space>
          </a-space>
        </a-col></a-row>
    </div>
  </el-card>
  <el-card
    class="box-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <span>结果</span>
      </div>
    </template>
    <div v-if="templateNum === 1">
      <el-row :gutter="0">
        <el-col :span="4">
          <el-card
            class="box-card"
            shadow="hover"
          >
            <AreaBasic
              style="width: auto;height: 35vh"
              :data="listDataA"
            />
          </el-card>
          <el-card
            class="box-card"
            shadow="hover"
          >
            <BarPolarLabelTangential
              style="width: auto;height: 35vh"
              :data="countDataB"
            />
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card
            class="box-card"
            shadow="hover"
            style="text-align: center"
          >
            {{ chartTitle }}——大屏可视化
          </el-card>
          <el-card
            class="box-card"
            shadow="hover"
          >
            <MultiLineSimple
              style="width: auto;height: 68vh"
              :data="compareDataA"
            />
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card
            class="box-card"
            shadow="hover"
          >
            <PieRoseTypeSimple
              style="width: auto;height: 40vh"
              :data="countDataC"
            />
          </el-card>
          <el-card
            class="box-card"
            shadow="hover"
          >
            <LinePolar
              style="width: auto;height: 30vh"
              :data="listDataB"
            />
          </el-card>
        </el-col>
      </el-row></div>
    <div v-if="templateNum === 2">
      <el-row :gutter="0">
        <el-col :span="12">
          <el-card
            class="box-card"
            shadow="hover"
            style="text-align: center"
          >
            {{ chartTitle }}——大屏可视化
          </el-card>
          <el-card
            class="box-card"
            shadow="hover"
          >
            <MultiRadarSimple
              style="width: auto;height: 68vh"
              :data="compareDataA"
            />
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card
            class="box-card"
            shadow="hover"
          >
            <ScatterPolynomialRegression
              style="width: auto;height: 35vh"
              :data="listDataD"
            />
          </el-card>
          <el-card
            class="box-card"
            shadow="hover"
          >
            <BarWaterfall
              style="width: auto;height: 35vh"
              :data="countDataA"
            />
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card
            class="box-card"
            shadow="hover"
          >
            <WordcloudSimple
              style="width: auto;height: 22vh"
              :data="countDataB"
            />
          </el-card>
          <el-card
            class="box-card"
            shadow="hover"
          >
            <LinePolar
              style="width: auto;height: 22vh"
              :data="listDataD"
            />
          </el-card>
          <el-card
            class="box-card"
            shadow="hover"
          >
            <BarPolarLabelRadial
              style="width: auto;height: 22vh"
              :data="countDataD"
            />
          </el-card>
        </el-col>
      </el-row></div>
    <div v-if="templateNum === 3">
      <el-row :gutter="0">
        <el-col :span="4">
          <el-card
            class="box-card"
            shadow="hover"
          >
            <ScatterLinearRegression
              style="width: auto;height: 35vh"
              :data="listDataA"
            />
          </el-card>
          <el-card
            class="box-card"
            shadow="hover"
          >
            <ScatterSimple
              style="width: auto;height: 35vh"
              :data="listDataA"
            />
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card
            class="box-card"
            shadow="hover"
          >
            <PieBorderRadius
              style="width: auto;height: 35vh"
              :data="countDataC"
            />
          </el-card>
          <el-card
            class="box-card"
            shadow="hover"
          >
            <LinePolar
              style="width: auto;height: 35vh"
              :data="listDataA"
            />
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card
            class="box-card"
            shadow="hover"
            style="text-align: center"
          >
            {{ chartTitle }}——大屏可视化
          </el-card>
          <el-card
            class="box-card"
            shadow="hover"
          >
            <MultiBarYCategory
              style="width: auto;height: 68vh"
              :data="compareDataA"
            />
          </el-card>
        </el-col>
      </el-row></div>
  </el-card>
</template>

<style scoped>
</style>
