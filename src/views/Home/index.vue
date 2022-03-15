<script setup>
import NavMenu from './navMenu.vue'
import Header from './header.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <NavMenu />
      <el-container>
        <Header />
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

</style>
