<!--
* @fileName ResetPassword.vue
* @author Di Sheng
* @date 2022/03/11 09:11:26
* @description
!-->
<template>
  <el-col class="reset-password-wrapper">
    <el-row class="title">密码重置</el-row>
    <el-row
      class="form-wrapper"
      :span="24"
    >
      <el-form
        ref="resetPasswordFormRef"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item
          prop="oldPassword"
          label="旧密码"
        >
          <el-input
            v-model="form.oldPassword"
            type="password"
            placeholder="6~20位, 至少包含数字、字母、特殊字符中的两种"
          />
        </el-form-item>
        <el-form-item
          prop="password"
          label="新密码"
        >
          <el-input
            v-model="form.password"
            type="password"
            placeholder="6~20位, 至少包含数字、字母、特殊字符中的两种"
          />
        </el-form-item>
        <el-form-item
          prop="passwordConfirm"
          label="确认新密码"
        >
          <el-input
            v-model="form.passwordConfirm"
            type="password"
            placeholder="6~20位, 至少包含数字、字母、特殊字符中的两种"
          />
        </el-form-item>
        <el-form-item
          prop="code"
          label="验证码"
        >
          <el-space>
            <el-input
              v-model="form.code"
              placeholder="验证码"
            />
            <VerificationCode ref="veCodeRef" />
          </el-space>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            @click="onResetPassword"
          >重置密码</el-button>
          <el-button
            @click="handleStepBack"
          >返回</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </el-col>

</template>

<script>
import { reactive, toRefs, defineComponent, unref, ref } from 'vue'
import { useRouter } from 'vue-router'
import {validatePassword} from '@/utils/validate'
import VerificationCode from '@/components/shared/VerificationCode'
export default defineComponent({
  components: {
    VerificationCode
  },
  setup(props, ctx) {
    const router = useRouter()
    const resetPasswordFormRef = ref()
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== state.form.password) {
        callback(new Error('两次输入的密码不一致'))
      }
      callback()
    }
    const state = reactive({

      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, message: '请二次输入新密码', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      },
      form: {},
    })


    const onResetPassword = () => {
      console.log('-----onResetPassword----')
    }
    const handleStepBack = () => {
      router.back()
    }

    return {
      resetPasswordFormRef,
      onResetPassword,
      handleStepBack,
      ...toRefs(state)
    }
  }
})
</script>
<style lang='scss' scoped>
.reset-password-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 600px;
  height: 450px;
  border-radius: 5px;
  background: #fff;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 30px 15px rgba(0, 0, 0, .4);
  padding: 15px;
  .title{
    font-size: 14px;
    font-weight: bold;
  }
  .form-wrapper{
    padding: 65px 100px;
  }
}
</style>
