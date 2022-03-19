<script setup>
import { useUserStore } from '@/store/userStore'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { getUserid } from '@/utils/auth'

const userStore = useUserStore()
userStore.getInfo(getUserid())

const handleCommand = (command) => {
  switch (command) {
    case 'a':
      router.push({ name: 'userInfo' })
      break
    case 'b':
      router.push({ name: 'userSetting' })
      break
    case 'c':
      userStore.logout()
      router.push({ name: 'login' })
      ElMessage.success('登出成功')
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
        <el-tag
          v-if="userStore.is_superuser"
          type="danger"
        >管理员用户</el-tag>
        <el-tag v-else>普通用户</el-tag>
      </li>
      <li>
        {{ userStore.username }}
      </li>
      <li>
        <el-dropdown @command="handleCommand">
          <el-avatar
            :src="userStore.image"
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
