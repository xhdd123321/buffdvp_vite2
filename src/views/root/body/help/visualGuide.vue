<script setup>
import { computed, ref } from 'vue'

const current = ref(1)
const src = computed(() => '/help/ana_step' + current.value + '.png')
const onPrev = () => {
  current.value = Math.max(1, current.value - 1)
}
const onNext = () => {
  current.value = Math.min(3, current.value + 1)
}
const setCurrent = (x) => {
  current.value = x
}
</script>

<template>
  <el-card
    class="box-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <span>快速开始</span>
      </div>
    </template>
    <div>
      <a-steps
        type="default"
        changeable
        :current="current"
        @change="setCurrent"
      >
        <a-step description="前往数据选择图表">选择图表</a-step>
        <a-step description="图表详情进行可视化操作">选择可视化选项</a-step>
        <a-step description="根据选项配置自定义生成图表">自定义可视化分析</a-step>
      </a-steps>
      <div
        :style="{
          width: '100%',
          textAlign: 'center',
          background: 'var(--color-bg-2)',
          color: '#C2C7CC',
          marginTop: '20px',
        }"
      >
        <a-image
          width="88%"
          :src="src"
        />
        <a-space
          size="large"
          style="margin-top: 20px"
        >
          <a-button
            type="secondary"
            :disabled="current <= 1"
            @click="onPrev"
          >
            <IconLeft /> Back
          </a-button>
          <a-button
            type="primary"
            :disabled="current >= 3"
            @click="onNext"
          >
            Next <IconRight />
          </a-button>
        </a-space>
      </div>
    </div>
  </el-card>
</template>

<style scoped>

</style>
