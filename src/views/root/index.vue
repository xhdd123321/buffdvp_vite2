<script setup>
import NavMenu from './navMenu.vue'
import Breadcrumb from './breadcrumb.vue'
import Header from './header.vue'
</script>

<template>
  <div class="common-layout">
    <el-container class="common-layout">
      <NavMenu class="NavMenu" />
      <el-container>
        <el-header class="header1"><Header /></el-header>
        <el-header class="header2"><Breadcrumb /></el-header>
        <el-main class="content"><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.NavMenu{
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04)
}
.header1{
  padding: 0;
  background: #fff;
  box-shadow: 10px 2px 12px 0 rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
}
.header2{
  height: auto;
  border-left: none;
  padding-top: 20px;
  padding-bottom: 10px;
}
.common-layout{
  width: 100%;
  height: 100%;
}
.content {
  padding-top: 10px;
}
</style>
