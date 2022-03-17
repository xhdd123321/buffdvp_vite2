<script setup>
import { useUserStore } from '@/store/userStore'
import router from '@/router'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()
const handleCommand = (command) => {
  switch (command) {
    case 'a':
      break
    case 'b':
      break
    case 'c':
      userStore.logout()
      ElMessage.success('登出成功')
      router.push({ name: 'login' })
      break
    default:
      // eslint-disable-next-line no-undef
      ElMessage({ message: `click on item ${command}` })
  }
}
</script>

<template>
  <div class="header">
    <div class="left-side" />
    <ul class="right-side">
      <li>
        xxx
      </li>
      <li>
        xxx
      </li>
      <li>
        <el-dropdown @command="handleCommand">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            alt="avatar"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">
                <span>用户中心</span>
              </el-dropdown-item>
              <el-dropdown-item command="b">
                <span>用户设置</span>
              </el-dropdown-item>
              <el-dropdown-item command="c">
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
    </ul>
  </div>

</template>

<style scoped>
.header{
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;
}
.right-side li {
  display: flex;
  align-items: center;
  padding: 0 10px;
}
</style>
