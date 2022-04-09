<script setup>
import { AnaGetCompare, AnaGetCount, AnaGetList } from '@/api/echart'
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

const data = ref(undefined)
const dataSet = ref([])
const dataType = ref(undefined)
const compareDataSet = ref('选择数据集')
const getDataList = async (chartId) => {
  dataSetloading.value = true
  dataSet.value = undefined
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
      // data.value = dataSet.value
      console.log(dataSet.value)
    } else if (dataType.value === '3') {
      const res = await AnaGetCompare(form)
      dataSet.value = res.data
      keyList.value = dataSet.value?.key_list || []
      contentList.value = dataSet.value?.content_list || []
      console.log(keyList.value)
      console.log(contentList.value)
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
  await initCompare()
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
  await initCompare()
  console.log('changeDataType:' + dataType.value)
  if (chartValue.value) {
    await getDataList(chartValue.value)
  }
  data.value = undefined
  chartDataItem.value = undefined
  echartSelect(0)
}

const keyList = ref([])
const contentList = ref([])
const visible = ref(false)
const selectedKey = ref(undefined)
const selectedContent = ref(undefined)

const initCompare = async () => {
  keyList.value = []
  contentList.value = []
  selectedKey.value = undefined
  selectedContent.value = undefined
}

const selectDataSet = () => {
  visible.value = true
}
const cancelSelect = () => {
  console.log('cancel')
  visible.value = false
}
const confirmSelect = () => {
  console.log('confirm')
  try {
    console.log(selectedKey.value)
    console.log(selectedContent.value)
    const temp = {}
    Object.assign(temp, keyList.value[selectedKey.value])
    chartDataItem.value = '数据集：' + '<' + Object.keys(keyList.value[selectedKey.value])[0] + '>'
    chartDataItem.value += '['
    for (const item of selectedContent.value) {
      Object.assign(temp, contentList.value[item])
      chartDataItem.value += Object.keys(contentList.value[item])[0] + ','
    }
    chartDataItem.value = chartDataItem.value.substring(0, chartDataItem.value.length - 1)
    chartDataItem.value += ']'
    console.log(temp)
    data.value = temp
    ElMessage.success('选择成功')
  } catch (err) {
    console.log(err)
    ElMessage.error('选择失败')
  }
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
              <a-radio
                value="3"
              >对比</a-radio>
            </a-radio-group>
            <div
              v-if="dataType==='3' && dataSet && dataSet.length !== 0"
            >
              <a-button
                type="secondary"
                :style="{width:'70%'}"
                @click="selectDataSet"
              >
                <template #icon>
                  <icon-plus />
                </template>
                {{ compareDataSet }}
              </a-button>
              <a-modal
                v-model:visible="visible"
                title="数据集选择"
                draggable
                width="50%"
                @cancel="cancelSelect"
                @ok="confirmSelect"
              >
                <a-typography-title :heading="6">
                  category
                </a-typography-title>
                <a-radio-group
                  v-model:model-value="selectedKey"
                  type="button"
                  size="mini"
                >
                  <a-radio
                    v-for="(item, index) in keyList"
                    :key="index"
                    :value="index"
                  >{{ Object.keys(item)[0] }}</a-radio>
                </a-radio-group>
                <a-divider />
                <a-typography-title :heading="6">
                  series
                </a-typography-title>
                <a-checkbox-group v-model:model-value="selectedContent">
                  <a-checkbox
                    v-for="(item, index) in contentList"
                    :key="index"
                    :value="index"
                  >
                    <template #checkbox="{ checked }">
                      <a-tag
                        :checked="checked"
                        checkable
                      >{{ Object.keys(item)[0] }}</a-tag>
                    </template>
                  </a-checkbox>
                </a-checkbox-group>
              </a-modal>
            </div>
            <a-select
              v-model="chartDataItem"
              :loading="dataSetloading"
              :style="{width:'70%', color:'#000', opacity:1}"
              placeholder="Please select dataSet..."
              :disabled="dataType==='3'"
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
          <a-space
            v-else-if="dataType==='3'"
            direction="vertical"
          >
            <a-space>
              <a-button
                type="primary"
                @click="echartSelect(41)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>多维折线图</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(42)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>多维雷达图</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(43)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>多维条形图</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(44)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>河流图</template>
              </a-button>
            </a-space>
            <a-space>
              <a-button
                type="primary"
                @click="echartSelect(45)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>堆叠条形图</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(46)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>堆叠面积图</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(47)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>多维阶梯图</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(48)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>堆叠极坐标图</template>
              </a-button>
            </a-space>
            <a-space>
              <a-button
                type="primary"
                @click="echartSelect(49)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>堆叠环形极坐标图</template>
              </a-button>
              <a-button
                type="primary"
                @click="echartSelect(50)"
              >
                <template #icon>
                  <icon-apps />
                </template>
                <template #default>多维圆角环形图</template>
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
      <MultiLineSimple
        v-else-if="chartShow[41]"
        :data="data"
      />
      <MultiRadarSimple
        v-else-if="chartShow[42]"
        :data="data"
      />
      <MultiBarYCategory
        v-else-if="chartShow[43]"
        :data="data"
      />
      <MultiThemeRiverBasic
        v-else-if="chartShow[44]"
        :data="data"
      />
      <MultiBarYCategoryStack
        v-else-if="chartShow[45]"
        :data="data"
      />
      <MultiAreaStack
        v-else-if="chartShow[46]"
        :data="data"
      />
      <MultiLineStep
        v-else-if="chartShow[47]"
        :data="data"
      />
      <MultiBarPolarStackRadial
        v-else-if="chartShow[48]"
        :data="data"
      />
      <MultiBarPolarStack
        v-else-if="chartShow[49]"
        :data="data"
      />
      <MultiPolarRoundCap
        v-else-if="chartShow[50]"
        :data="data"
      />
      <a-empty v-else />
    </div>
  </el-card>
</template>

<style scoped>
</style>
