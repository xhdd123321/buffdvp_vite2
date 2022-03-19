<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const breadList = computed(() => route.matched)
console.log(route.matched)
</script>

<template>
  <el-breadcrumb
    :separator-icon="ArrowRight"
    class="breadcrumb"
  >
    <!--默认给一个首页的跳转，如果不需要可以去掉-->
    <el-breadcrumb-item><el-icon><Menu /></el-icon></el-breadcrumb-item>
    <!--面包屑列表-->
    <el-breadcrumb-item
      v-for="(item,index) in breadList"
      :key="index"
      :to="{ path: item.path }"
    >
      {{ item.meta.title ? item.meta.title : item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>
.breadcrumb{
  padding-left: 5px;
  height: auto;
}
</style>
