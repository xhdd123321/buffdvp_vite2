<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const name = ref('首页')
</script>

<template>
  <div>{{ name }}---{{ store.state.num }}</div>
  <el-button>primary</el-button>
</template>

<style scoped>

</style>
