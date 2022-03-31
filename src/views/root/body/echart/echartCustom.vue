<script setup>
import { AnaGetCount, AnaGetList } from '@/api/echart'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { ChartList } from '@/api/chart'
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
const dataSetloading = ref(false)
const route = useRoute()

const data = ref(undefined)
const dataSet = ref([])
const dataType = ref(undefined)
const getDataList = async (chartId) => {
  dataSetloading.value = true
  try {
    const form = {
      chart_id: chartId
    }
    console.log(dataType.value)
    if (dataType.value === '1') {
      const res = await AnaGetCount(form)
      dataSet.value = res.data
      // data.value = dataSet.value[0]
      console.log(dataSet.value)
    } else if (dataType.value === '2') {
      const res = await AnaGetList(form)
      dataSet.value = res.data
      data.value = dataSet.value
      console.log(dataSet.value)
    } else {
      // ElMessage.warning('请选择数据集类型')
    }
  } catch (err) {
    console.log(err)
    ElMessage.error('分析数据获取失败')
  }
  dataSetloading.value = false
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
  echartSelect(0)
}
const dataSetChange = async () => {
  data.value = dataSet.value[chartDataItem.value]
  console.log(data.value)
}

const echartSelect = (num) => {
  if (!data.value && num !== 0) {
    ElMessage.warning('请选择数据集')
    return
  }
  chartShow.value.forEach(function (item, index, arr) {
    arr[index] = false
  })
  chartShow.value[num] = true
}

const chartShow = ref([true])

const changeDataType = async (value) => {
  dataType.value = value
  console.log('changeDataType:' + dataType.value)
  if (chartValue.value) {
    await getDataList(chartValue.value)
  }
  data.value = undefined
  chartDataItem.value = undefined
  echartSelect(0)
}

const initPage = async () => {
  await getChartList()
  console.log(route.params)
  if (route.params?.id) {
    chartValue.value = route.params.id
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
        <span>自定义可视化</span>
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
            <a-radio-group
              type="button"
              @change="changeDataType"
            >
              <a-radio
                value="1"
              >统计</a-radio>
              <a-radio
                value="2"
              >趋势</a-radio>
            </a-radio-group>
            <a-select
              v-model="chartDataItem"
              :loading="dataSetloading"
              :style="{width:'70%'}"
              placeholder="Please select dataSet..."
              @change="dataSetChange"
            >
              <a-option
                v-for="(item, index) in dataSet"
                :key="index"
                :value="index"
                :label="'数据集: ' + (item.title || Object.keys(item)[0] + '-' + Object.keys(item)[1])"
              />
            </a-select>
          </a-space>
        </a-col>
        <a-col :span="14">
          <a-space
            v-if="dataType==='1'"
            direction="vertical"
          >
            <a-space>
              <a-button
                type="primary"
                @click="echartSelect(1)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>基础饼图</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(2)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>圆角环形图</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(3)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>南丁格尔玫瑰图</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(4)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>环形图</template>
              </a-button>
            </a-space>
            <a-space>
              <a-button
                type="primary"
                @click="echartSelect(5)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>基础柱状图</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(6)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>极坐标柱状图</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(7)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>环形极坐标柱状图</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(8)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>瀑布图</template>
              </a-button>
            </a-space>
            <a-space>
              <a-button
                type="primary"
                @click="echartSelect(9)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>词云</template>
              </a-button>
            </a-space>
          </a-space>
          <a-space
            v-else-if="dataType==='2'"
            direction="vertical"
          >
            <a-space>
              <a-button
                type="primary"
                @click="echartSelect(21)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>基础散点图</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(22)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>指数回归</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(23)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>线性回归</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(24)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>多项式回归</template>
              </a-button>
            </a-space>
            <a-space>
              <a-button
                type="primary"
                @click="echartSelect(25)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>基础折线图</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(26)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>平滑折线图</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(27)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>基础面积图</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(28)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>极坐标双数值</template>
              </a-button>
            </a-space>
          </a-space>
          <a-empty v-else>
            <template #image>
              <icon-exclamation-circle-fill />
            </template>
            无图表类型，请选择数据集类型
          </a-empty>
        </a-col>
      </a-row>
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
    <div>
      <a-empty v-if="chartShow[0]" />
      <PieBorderRadius
        v-else-if="chartShow[1]"
        :data="data"
      />
      <PieSimple
        v-else-if="chartShow[2]"
        :data="data"
      />
      <PieRoseTypeSimple
        v-else-if="chartShow[3]"
        :data="data"
      />
      <PieDoughnut
        v-else-if="chartShow[4]"
        :data="data"
      />
      <BarSimple
        v-else-if="chartShow[5]"
        :data="data"
      />
      <BarPolarLabelRadial
        v-else-if="chartShow[6]"
        :data="data"
      />
      <BarPolarLabelTangential
        v-else-if="chartShow[7]"
        :data="data"
      />
      <BarWaterfall
        v-else-if="chartShow[8]"
        :data="data"
      />
      <WordcloudSimple
        v-else-if="chartShow[9]"
        :data="data"
      />
      <ScatterSimple
        v-else-if="chartShow[21]"
        :data="data"
      />
      <ScatterExponentialRegression
        v-else-if="chartShow[22]"
        :data="data"
      />
      <ScatterLinearRegression
        v-else-if="chartShow[23]"
        :data="data"
      />
      <ScatterPolynomialRegression
        v-else-if="chartShow[24]"
        :data="data"
      />
      <LineSimple
        v-else-if="chartShow[25]"
        :data="data"
      />
      <LineSmooth
        v-else-if="chartShow[26]"
        :data="data"
      />
      <AreaBasic
        v-else-if="chartShow[27]"
        :data="data"
      />
      <LinePolar
        v-else-if="chartShow[28]"
        :data="data"
      />
      <a-empty v-else />
    </div>
  </el-card>
</template>

<style scoped>

</style>
