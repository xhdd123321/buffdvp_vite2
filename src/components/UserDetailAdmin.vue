<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { UserRetrieve, UserUpdate } from '@/api/user'

const emit = defineEmits(['ok'])
const id = ref(0)
const data = ref({})
const getUserInfo = async (id) => {
  try {
    const res = await UserRetrieve(id)
    data.value = res.data
    console.log(data.value)
  } catch (err) {
    console.log(err)
    data.value = {}
    ElMessage.error('用户详情获取失败')
  }
}

const visible = ref(false)
const selectUser = async (record) => {
  id.value = record
  await getUserInfo(id.value)
  visible.value = true
}

const ruleFormRef = ref(null)
const onReset = async () => {
  try {
    await getUserInfo(id.value)
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
    const { nick_name, gender, email, mobile } = data.value
    const updateForm = { nick_name, gender, email, mobile }
    await UserUpdate(id.value, updateForm)
    await getUserInfo(id.value)
    ElMessage.success('保存成功')
  } catch (err) {
    console.log(err)
    ElMessage.error('保存失败')
  }
}

const cancelSelect = () => {
  console.log('cancel')
  visible.value = false
}
const confirmSelect = async () => {
  console.log('cancel')
  visible.value = false
  emit('ok')
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
defineExpose({ selectUser })
</script>

<template>
  <a-modal
    v-model:visible="visible"
    title="用户信息"
    draggable
    width="50%"
    hide-cancel
    @cancel="cancelSelect"
    @ok="confirmSelect"
  >
    <el-form
      ref="ruleFormRef"
      label-position="top"
      :model="data"
      :rules="rules"
      label-width="auto"
      size="default"
      status-icon
    >
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input
          v-model="data.username"
          disabled
        />
      </el-form-item>
      <el-form-item
        label="昵称"
        prop="nick_name"
      >
        <el-input v-model="data.nick_name" />
      </el-form-item>

      <el-form-item
        label="性别"
        prop="gender"
      >
        <el-radio-group v-model="data.gender">
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
        <el-input v-model="data.email" />
      </el-form-item>

      <el-form-item
        label="手机"
        prop="mobile"
      >
        <el-input
          v-model="data.mobile"
          type="number"
        />
      </el-form-item>
      <el-form-item
        label="注册时间"
        prop="date_joined"
      >
        <el-input
          v-model="data.date_joined"
          disabled
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
  </a-modal>
</template>

<style scoped>

</style>
