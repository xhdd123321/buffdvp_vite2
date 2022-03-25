<script setup>
import { ref } from 'vue'
const form = ref({})
</script>

<template>
  <el-card
    class="box-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <span>用户设置</span>
      </div>
    </template>
    <div>
      <a-form
        :model="form"
        :style="{width:'600px'}"
        @submit="handleSubmit"
      >
        <a-form-item
          field="notice"
          label="接收通知"
        >
          <a-switch v-model="form.notice" />
        </a-form-item>
      </a-form>
    </div>
  </el-card>
</template>

<style scoped>

</style>
