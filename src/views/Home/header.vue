<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { onBeforeRouteUpdate } from 'vue-router'
import router from '@/router'
const breadcrumbClick = (item) => {
  router.push({ path: item.path })
}

onBeforeRouteUpdate((to) => {
  getBreadcrumb()
})
</script>

<script>
// 面包屑数据处理
function getBreadcrumb () {
  const that = this
  // 由于本项目大部分属于‘一级’页面，所以在设置路由时候，一级页面不设置breadNumber = 1，‘二级’页面以上才设置breadNumber
  const breadNumber = typeof (this.$route.meta.breadNumber) !== 'undefined' ? this.$route.meta.breadNumber : 1
  // 获取当前页面的名字和路由，并组合成新的对象
  const newBread = { name: this.$route.name, path: this.$route.fullPath }
  let vuexBreadList = [] // 默认初始化面包屑数据
  if (breadNumber !== 1) {
    // 当前面包屑breadNumber大于1时才会从vuex中获取值
    vuexBreadList = that.$store.state.breadListState // 获取breadList数组
  }
  if (breadNumber < vuexBreadList.length) {
    // "回退"面包屑----判断条件：当前路由breadNumber小于vuexBreadList的长度
    vuexBreadList.splice(breadNumber - vuexBreadList.length, vuexBreadList.length - breadNumber)
  }
  if (breadNumber > vuexBreadList.length) {
    // 添加面包屑----判断条件：当前路由breadNumber大于vuexBreadList的长度
    vuexBreadList.push(newBread)
  }
  // 处理完数据后，将最终的数据更新到vuex（用于页面刷新）
  that.$store.commit('breadListMutations', vuexBreadList)
  // 处理完数据后，将最终的数据更新为新的面包屑数组
  that.breadList = vuexBreadList
}
</script>

<template>
  <el-header>
    <el-breadcrumb
      :separator-icon="ArrowRight"
      class="breadcrumb"
    >
      <!--默认给一个首页的跳转，如果不需要可以去掉-->
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <!--面包屑列表-->
      <el-breadcrumb-item
        v-for="(item,index) in breadList"
        :key="index"
        style="cursor: pointer"
        @click="breadcrumbClick(item)"
      >
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
</template>

<style scoped>

</style>
