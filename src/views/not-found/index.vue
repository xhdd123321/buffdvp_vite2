<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const back = () => {
  // warning： Go to the node that has the permission
  router.back()
}
</script>

<template>
  <div class="content">
    <a-result
      class="result"
      status="404"
      :subtitle="'not found'"
    />
    <div class="operation-row">
      <a-button
        key="back"
        type="primary"
        @click="back"
      > back </a-button>
    </div>
  </div>
</template>

<style scoped>
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -95px;
  margin-top: -121px;
  text-align: center;
}
</style>
