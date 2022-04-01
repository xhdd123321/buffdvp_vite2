<script setup>
import { ref, reactive } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/userStore'
import { ElMessage } from 'element-plus'
const router = useRouter()
const userStore = useUserStore()
const ruleFormRef = ref(null)
const ruleForm = reactive({
  username: 'admin',
  password: 'admin'
})
const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      min: 4,
      max: 18,
      message: 'Length should be 4 to 18',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      min: 5,
      max: 18,
      message: 'Length should be 5 to 18',
      trigger: 'blur'
    }
  ]
})

const onLogin = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        await userStore.login(ruleForm)
        ElMessage.success('登陆成功')
        await router.push({ name: 'home' })
      } catch (err) {
        ElMessage.error('登陆失败，用户名或密码不正确')
      }
    } else {
      console.log('error auth!', fields)
      ElMessage.warning('未通过验证')
    }
  })
}

const onRegister = () => {
  router.push({ name: 'register' })
  console.log('register!')
}
</script>

<template>
  <el-form
    ref="ruleFormRef"
    label-position="top"
    class="login-form"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    size="default"
    hide-required-asterisk
    status-icon
  >
    <img
      class="logo"
      alt="BuffDVP logo"
      src="@/assets/logo.png"
    >
    <el-form-item
      label="用户名"
      prop="username"
    >
      <el-input v-model="ruleForm.username" />
    </el-form-item>

    <el-form-item
      label="密码"
      prop="password"
    >
      <el-input
        v-model="ruleForm.password"
        type="password"
      />
    </el-form-item>

    <el-form-item>
      <el-button-group>
        <el-button
          type="success"
          plain
          class="bottom_button"
          @click="onLogin(ruleFormRef)"
        >
          <el-icon class="el-icon--left">
            <arrow-left />
          </el-icon>登 录
        </el-button>
        <el-button
          type="primary"
          plain
          class="bottom_button"
          @click="onRegister"
        >
          注 册<el-icon class="el-icon--right">
            <arrow-right />
          </el-icon>
        </el-button>
      </el-button-group>
    </el-form-item>
  </el-form>
</template>

<style scoped>
@import url("@/style/auth.css");
</style>
