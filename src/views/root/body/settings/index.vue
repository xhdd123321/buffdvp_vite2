<script setup>
const exitSystem = () => {
  window.opener = null
  window.open('about:blank', '_top').close()
}
</script>

<template>
  <el-card
    class="box-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <span>设置</span>
      </div>
    </template>
    <div>
      <div class="flex-box">
        <span class="avatar"><icon-github /></span>
        <div class="content">
          <a-typography-title :heading="6">前端源代码</a-typography-title>
          <a-link
            href="https://github.com/xhdd123321/buffdvp_vite2"
            target="_blank"
            icon
          >https://github.com/xhdd123321/buffdvp_vite2</a-link>
        </div>
      </div>
      <a-divider class="half-divider" />
      <div class="flex-box">
        <span class="avatar"><icon-github /></span>
        <div class="content">
          <a-typography-title :heading="6">后端源代码</a-typography-title>
          <a-link
            href="https://github.com/xhdd123321/buffdvp_django"
            target="_blank"
            icon
          >https://github.com/xhdd123321/buffdvp_django</a-link>
        </div>
      </div>
      <a-divider class="half-divider" />
      <a-button
        type="primary"
        status="danger"
        @click="exitSystem"
      >退出系统</a-button>
    </div>
  </el-card>
</template>

<style scoped>
.divider-demo {
  box-sizing: border-box;
  width: 560px;
  padding: 24px;
  border: 30px solid rgb(var(--gray-2));
}
.half-divider {
  left: 55px;
  width: calc(100% - 55px);
  min-width: auto;
  margin: 16px 0;
}
.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-box .avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  color: var(--color-text-2);
  font-size: 40px;
  border-radius: 50%;
}
.flex-box .content {
  flex: 1;
  color: var(--color-text-2);
  font-size: 12px;
  line-height: 20px;
}
</style>
