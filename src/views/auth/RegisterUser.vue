/<!--
* @fileName RegisterUser.vue
* @author Di Sheng
* @date 2022/03/14 10:11:23
* @description: register user
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
          prop="account"
          label="账号"
        >
          <el-input
            v-model="form.account"
            placeholder="账号"
          />
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
        >
          <el-input
            v-model="form.password"
            type="password"
            placeholder="6~20位, 至少包含数字、字母、特殊字符中的两种"
          />
        </el-form-item>
        <el-form-item
          prop="passwordConfirm"
          label="确认密码"
        >
          <el-input
            v-model="form.passwordConfirm"
            type="password"
            placeholder="6~20位, 至少包含数字、字母、特殊字符中的两种"
          />
        </el-form-item>
        <el-form-item
          prop="username"
          label="姓名"
        >
          <el-input
            v-model="form.username"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item
          label="联系电话"
          prop="telno"
        >
          <el-input
            v-model="form.telno"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            v-model="form.email"
            placeholder="请输入邮箱"
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
        <el-form-item
          prop="smsCode"
          label="手机验证码"
        >
          <el-space>
            <el-input
              v-model="form.smsCode"
              placeholder="验证码"
            />
            <el-button
              type="warning"
              :disabled="isSmsButtonDisabled"
              @click="onSendCode"
            >{{ isSmsButtonDisabled ? "倒计时" + smsCountdown + "秒" : "获取验证码" }}</el-button>
          </el-space>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            @click="onSubmit"
          >完成</el-button>
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
import {validatePassword, validateCellphone, validateEmail} from '@/utils/validate'
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
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur', max: 30 }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        smsCode: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, message: '请二次输入密码', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ],
        telno: [
          { required: true, message: '请输入手机号', trigger: 'blur'},
          { validator: validateCellphone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur'},
          { validator: validateEmail, trigger: 'blur' }
        ],
        depart: [
          { required: true, message: '请输入部门', trigger: 'blur'}
        ],

      },
      form: {},
    })


    const onSubmit = () => {
      console.log('-----onSubmit----')
    }
    const handleStepBack = () => {
      router.back()
    }

    const setTimeCallback = () => {
      smsStates.smsCountdown = 60
      smsStates.isSmsButtonDisabled = true
      const timer = setInterval(() => {
        if (smsStates.smsCountdown === 0) {
          clearInterval(timer)
          this.isSmsButtonDisabled = false
        } else {
          smsStates.smsCountdown--
        }
      }, 1000)
    }
    const smsStates = reactive({
      isSmsButtonDisabled: false,
      smsCountdown: 60,
      onSendCode() {
        const fieldToValidate = ['username', 'password', 'email', 'telno', 'passwordConfirm', 'account', 'code']
        Promise.all(
          fieldToValidate.map(item => {
            const p = new Promise((resolve, reject) => {
              resetPasswordFormRef.value.validateField(item, valid => {
                resolve(valid)
              })
            })
            return p
          })
        ).then(results => {
          const filteredResult = results.filter(item => item !== '')
          if (filteredResult.length === 0) {
            setTimeCallback()
          }
        })
      }
    })
    return {
      resetPasswordFormRef,
      onSubmit,
      handleStepBack,
      ...toRefs(smsStates),
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
  height: 550px;
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
