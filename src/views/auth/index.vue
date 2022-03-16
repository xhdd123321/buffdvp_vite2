<script setup>
import bg from '@/assets/login/bg.png'
import illustration0 from '@/assets/login/illustration3.svg'
</script>

<template>
  <img
    :src="bg"
    class="wave"
  >
  <div class="login-container">
    <div class="img">
      <img :src="illustration0">
    </div>
    <div class="login-box">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/auth.css");
</style>
