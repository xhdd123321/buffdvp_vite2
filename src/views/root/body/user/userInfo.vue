<script setup>
import { PasswordChange, UserUpdate } from '@/api/user'
import { getUserid } from '@/utils/auth'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/userStore'
const userStore = useUserStore()
const userInfo = ref({})
const getUserInfo = async () => {
  try {
    const pk = getUserid()
    await userStore.getInfo(pk)
    userInfo.value = userStore.userInfo
    console.log(userInfo)
  } catch (err) {
    console.log(err)
    ElMessage.error('获取用户信息失败')
  }
}
getUserInfo()

let formData = null

const ruleFormRef = ref(null)
const uploadRef = ref()
const onReset = async () => {
  try {
    await getUserInfo()
    ruleFormRef.value.validate()
    ElMessage.success('重设成功')
  } catch (err) {
    console.log(err)
    ElMessage.error('重设失败')
  }
}

const onSave = async (formEl) => {
  try {
    if (!formEl) return
    formEl.validate(async (valid, fields) => {
      if (valid) {
        try {
          // eslint-disable-next-line camelcase
          // const { nick_name, gender, email, mobile } = userInfo.value
          // const updateForm = { nick_name, gender, email, mobile }
          // eslint-disable-next-line camelcase
          const { nick_name, gender, email, mobile } = userInfo.value
          formData = new FormData()
          formData.append('nick_name', nick_name)
          formData.append('gender', gender)
          formData.append('email', email)
          formData.append('mobile', mobile)
          uploadRef.value.submit()
          formData.forEach((key, value) => {
            console.log(`key ${key}: value ${value}`)
          })
          await UserUpdate(getUserid(), formData)
          getUserInfo()
          ElMessage.success('保存成功')
        } catch (err) {
          ElMessage.error('保存失败，表单数据有误')
        }
      } else {
        console.log('validate error!', fields)
        ElMessage.warning('未通过验证')
      }
    })
  } catch (err) {
    console.log(err)
    ElMessage.error('保存失败')
  }
}

const beforeAvatarUpload = (file) => {
  formData.append('image', file)
  return false
}

const handleExceed = (files) => {
  uploadRef.value.clearFiles()
  uploadRef.value.handleStart(files[0])
}

const handlePictureCardPreview = (file) => {
  const isPNG = file.raw.type === 'image/png'
  const isLt2M = file.raw.size / 1024 / 1024 < 2
  console.log(file)
  if (!isPNG) {
    ElMessage.error('Avatar picture must be PNG format!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  console.log(file.url)
  userInfo.value.image = file.url
}

const rules = reactive({
  mobile: [
    {
      min: 11,
      max: 11,
      message: 'Length should be 11',
      trigger: 'blur'
    }
  ]
})

const passwordForm = ref({})

const confirmPassword = (rule, value, callback) => {
  if (value !== passwordForm.value.new_password) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
}

const rulesPassword = reactive({
  old_password: [
    {
      required: true,
      message: '请输入旧密码',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 18,
      message: 'Length should be 6 to 18',
      trigger: 'blur'
    }
  ],
  new_password: [
    {
      required: true,
      message: '请输入新密码',
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
    },
    {
      validator: confirmPassword,
      trigger: 'blur'
    }
  ]
})

const passwordRef = ref(null)
const onSavePassword = async (passwordRef) => {
  try {
    if (!passwordRef) return
    passwordRef.validate(async (valid, fields) => {
      if (valid) {
        try {
          const pk = getUserid()
          await PasswordChange(pk, passwordForm.value)
          ElMessage.success('密码修改成功')
        } catch (err) {
          ElMessage.error('修改失败，旧密码错误')
        }
      } else {
        console.log('validate error!', fields)
        ElMessage.warning('未通过验证')
      }
    })
  } catch (err) {
    console.log(err)
    ElMessage.error('未通过验证')
  }
}

const onResetPassword = () => {
  passwordForm.value = {}
}
</script>

<template>
  <el-card
    class="box-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <span>基本信息</span>
      </div>
    </template>
    <div>
      <el-descriptions
        :column="1"
        border
      >
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-space wrap>
                <el-icon><wallet /></el-icon>
                <span>用户名</span>
                <el-space wrap />
              </el-space>
            </div>
          </template>
          {{ userInfo.username }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-space wrap>
                <el-icon><crop /></el-icon>
                <span>类型</span>
              </el-space>
            </div>
          </template>
          <el-tag>{{ userInfo.is_superuser ? '管理员' : '普通用户' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-space wrap>
                <el-icon><message /></el-icon>
                <span>注册时间</span>
              </el-space>
            </div>
          </template>
          {{ userInfo.date_joined }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
  <el-card
    class="box-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <span>头像上传</span>
      </div>
    </template>
    <div>
      <a-alert closable>保存后生效</a-alert>
      <a-divider />
      <el-upload
        ref="uploadRef"
        action="#"
        list-type="picture"
        class="avatar-uploader"
        :show-file-list="false"
        :limit="1"
        :on-exceed="handleExceed"
        :before-upload="beforeAvatarUpload"
        :on-change="handlePictureCardPreview"
        :auto-upload="false"
      >
        <img
          :src="userInfo.image"
          class="avatar"
        >
      </el-upload>
    </div>
  </el-card>
  <el-card
    class="box-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <span>额外信息</span>
      </div>
    </template>
    <div>
      <el-form
        ref="ruleFormRef"
        label-position="top"
        :model="userInfo"
        :rules="rules"
        label-width="auto"
        size="default"
        status-icon
      >
        <el-form-item
          label="昵称"
          prop="nick_name"
        >
          <el-input v-model="userInfo.nick_name" />
        </el-form-item>

        <el-form-item
          label="性别"
          prop="gender"
        >
          <el-radio-group v-model="userInfo.gender">
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
          <el-input v-model="userInfo.email" />
        </el-form-item>

        <el-form-item
          label="手机"
          prop="mobile"
        >
          <el-input
            v-model="userInfo.mobile"
            type="number"
          />
        </el-form-item>
        <el-form-item class="button-group">
          <el-button
            type="success"
            plain
            @click="onSave(ruleFormRef)"
          >保 存</el-button>
          <el-button
            type="info"
            plain
            @click="onReset()"
          >重 设</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  <el-card
    class="box-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <span>密码修改</span>
      </div>
    </template>
    <div>
      <el-form
        ref="passwordRef"
        label-position="top"
        class="login-form"
        :rules="rulesPassword"
        :model="passwordForm"
        label-width="auto"
        size="default"
        status-icon
      >
        <el-form-item
          label="旧密码"
          prop="old_password"
        >
          <el-input
            v-model="passwordForm.old_password"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="new_password"
        >
          <el-input
            v-model="passwordForm.new_password"
            type="password"
            show-password
          />
        </el-form-item>

        <el-form-item
          label="确认密码"
          prop="re_password"
        >
          <el-input
            v-model="passwordForm.re_password"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item class="button-group">
          <el-button
            type="success"
            plain
            @click="onSavePassword(passwordRef)"
          >保 存</el-button>
          <el-button
            type="info"
            plain
            @click="onResetPassword()"
          >重 设</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<style scoped>
.box-card {
  margin-bottom: 15px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
.avatar-uploader el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
