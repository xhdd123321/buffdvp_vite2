<script setup>
import store from '@/store'
// 在页面加载时读取sessionStorage里的状态信息
sessionStorage.getItem('umeetCloudVuex') && store.replaceState(Object.assign(store.state, JSON.parse(sessionStorage.getItem('umeetCloudVuex'))))
// 在页面刷新时将vuex里的信息保存到sessionStorage里
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('umeetCloudVuex', JSON.stringify(store.state))
})

</script>

<template>
  <el-config-provider>
    <router-view />
  </el-config-provider>
</template>

<style>
</style>
