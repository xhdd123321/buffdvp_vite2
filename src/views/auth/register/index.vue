<script setup>
import { ref, reactive } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { UserCreate } from '@/api/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const ruleFormRef = ref(null)
const ruleForm = reactive({
  username: '',
  password: '',
  re_password: '',
  nick_name: '',
  gender: '未知',
  email: '',
  mobile: ''
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
      min: 6,
      max: 18,
      message: 'Length should be 6 to 18',
      trigger: 'blur'
    }
  ],
  re_password: [
    {
      required: true,
      message: '请二次确认密码',
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      min: 11,
      max: 11,
      message: 'Length should be 11',
      trigger: 'blur'
    }
  ]
})

const onLogin = () => {
  router.push({ name: 'login' })
  console.log('register!')
}

const onRegister = (formEl) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      UserCreate(ruleForm).then(res => {
        alert('注册成功')
        router.push({ name: 'login' })
        console.log('request success!', res)
      }).catch(err => {
        const msg = err.response.data
        alert(JSON.stringify(msg[(Object.keys(msg)[0])][0]))
      })
    } else {
      console.log('valid error!', fields)
    }
  })
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
        show-password
      />
    </el-form-item>

    <el-form-item
      label="确认密码"
      prop="re_password"
    >
      <el-input
        v-model="ruleForm.re_password"
        type="password"
        show-password
      />
    </el-form-item>

    <el-form-item
      label="昵称"
      prop="nick_name"
    >
      <el-input v-model="ruleForm.nick_name" />
    </el-form-item>

    <el-form-item
      label="性别"
      prop="gender"
    >
      <el-radio-group v-model="ruleForm.gender">
        <el-radio label="男">
          男
        </el-radio>
        <el-radio label="女">
          女
        </el-radio>
        <el-radio label="未知">
          未知
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item
      label="邮箱"
      prop="email"
    >
      <el-input v-model="ruleForm.email" />
    </el-form-item>

    <el-form-item
      label="手机"
      prop="mobile"
    >
      <el-input
        v-model="ruleForm.mobile"
        type="number"
      />
    </el-form-item>

    <el-form-item>
      <el-button-group>
        <el-button
          type="success"
          plain
          class="bottom_button"
          @click="onLogin"
        >
          <el-icon class="el-icon--left">
            <arrow-left />
          </el-icon>登 录
        </el-button>
        <el-button
          type="primary"
          plain
          class="bottom_button"
          @click="onRegister(ruleFormRef)"
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
