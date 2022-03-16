<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const breadList = computed(() => route.matched)

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
        :to="{ path: item.path }"
      >
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
</template>

<style scoped>

</style>
