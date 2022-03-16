<script setup>
</script>

<template>
  <el-aside width="200px">
    <el-menu
      default-active="/home/index"
      class="el-menu"
      router
    >
      <img
        class="aside-avatar"
        src="@/assets/title-img.png"
      >
      <el-menu-item index="/home/index">
        <el-icon><HomeFilled /></el-icon>
        <span>首 页</span>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><histogram /></el-icon>
          <span>可 视 化</span>
        </template>
        <el-menu-item index="/home/echartOne">item one</el-menu-item>
        <el-menu-item index="/home/echartTwo">item two</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><files /></el-icon>
          <span>文 件 管 理</span>
        </template>
        <el-menu-item index="/home/fileOne">item one</el-menu-item>
        <el-menu-item index="/home/fileTwo">item one</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon><grid /></el-icon>
          <span>表 格 管 理</span>
        </template>
        <el-menu-item index="/home/dataOne">item one</el-menu-item>
        <el-menu-item index="/home/dataTwo">item one</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/home/setting"><el-icon><Setting /></el-icon><span>设 置</span></el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped>
.aside-avatar{
  width: 190px;
  margin: 10px 0 5px 0;
  align-items: center;
}
</style>
