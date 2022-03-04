<template>


  <el-row
    class="login"
  >
    <el-col
      class="login-left-image"
      :span="10"
    />
    <el-col
      class="login-body"
      :span="14"
    >
      <div ref="loadingTarget">
        <div
          class="login-title"
        >欢迎登录</div>
        <div class="login-subtitle">云wifi虚拟化AC</div>
        <el-form
          ref="loginFormRef"
          :model="form"
          :rules="rules"
          label-width="0px"
        >
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              placeholder="用户名"
            />
          </el-form-item>
          <el-form-item prop="password">
            <!-- <el-input type="password" placeholder="密码" v-model="form.password" @keyup.enter.native="handleSubmit('loginForm')"> -->
            <el-input
              v-model="form.password"
              type="password"
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item prop="code">
            <el-space>
              <el-input
                v-model="form.code"
                placeholder="验证码"
              />
              <VerificationCode ref="veCodeRef" />
            </el-space>
          </el-form-item>
          <div class="login-btn">
            <el-button
              type="primary"
              @click="onSubmit"
            >登录</el-button>
          </div>
          <div class="login-new-user-btn-wrapper">
            <el-button
              type="text"
              @click="handleRegisterUser"
            > 新用户注册</el-button>
          </div>

        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { postLogin } from '@/api/auth'
import { reactive, toRefs, defineComponent, unref, ref } from 'vue'
import VerificationCode from '@/components/shared/VerificationCode'
import {validatePassword} from '@/utils/validate'
import md5 from 'js-md5'
import { sessionStore } from '@/stores/sessionStore'
import { useRouter } from 'vue-router'
import { throttle } from 'lodash'
import useLoading from '@/components/shared/useLoading'
export default defineComponent({
  components: {
    VerificationCode
  },
  setup(props, ctx) {
    const router = useRouter()
    const loginFormRef = ref()

    const login = async() => {
      const form = unref(loginFormRef)
      try {
        wrapLoading(async() => {
          await form.validate()
          const {username, password, code} = state.form
          const payload = {
            account: username,
            password: md5(password),
            picCaptcha: code,
          }
          const {data: res} = await postLogin(payload)
          if (res.errorCode === '0') {
            console.log('------login success---', res.data)
            const store = sessionStore()
            Object.keys(res.data).map(key => {
              store.userInfo[key] = res.data[key]
            })
            router.push({name: 'home'})
          }
        })
      } catch (err) {
        console.log(err)
      }
    }

    const state = reactive({
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      },
      onSubmit: throttle(login, 1000),
      form: {},
    })
    const {loadingTarget, wrapLoading} = useLoading()
    const handleRegisterUser = () => {
      wrapLoading(async() => {
        await new Promise(resolve => {
          setTimeout(() => {
            resolve()
          }, 3000)
        })
      })
    }
    return {
      handleRegisterUser,
      loginFormRef,
      loadingTarget,
      ...toRefs(state),
    }
  }

})



// export default {
//   data() {
//     return {
//       form: {
//         username: '',
//         password: '',
//         remember_me: true
//       },
//       rules: {
//         username: [
//           { required: true, message: '请输入邮箱地址', trigger: 'change,blur' }
//         ],
//         password: [
//           { required: true, message: '请输入密码', trigger: 'blur' }
//         ]
//       }
//     }
//   },
//   methods: {
//     handleSubmit(formName) {
//       this.$refs[formName].validate(async(valid) => {
//         if (valid) {
//           const loginResult = await postLogin(this.form)
//           this.$store.commit('session/setToken', loginResult.data)
//           this.$router.push({ path: '/' })
//         }
//       })
//     }
//   }
// }
</script>

<style lang="scss" scoped>
  .login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 800px;
    height: 500px;
    border-radius: 5px;
    background: #fff;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 30px 15px rgba(0, 0, 0, .4);
  }
  .login-body{
    padding: 65px 100px;
  }
  .login-left-image{
    border: none;
    border-radius: 5px 0px 0px 5px;
    background: url("@/assets/images/login.png") center;
  }

  .login-title {
    width: 100%;
    text-align: center;
    font-size: 20px;
    color:  $dark-brown;;
    margin-bottom: 3px;
  }
  .login-subtitle {
    width: 100%;
    text-align: center;
    font-size: 14px;
    color:  $lite-grey;
    margin-bottom: 30px;
  }

  button {
    @include when-inside('.login-btn') {
      background-image: linear-gradient(270deg, #87B5FE 0%, #4F7EFC 100%);
      width: 100%;
      border-radius: 20px;
      height: 40px;
    }
  }
  .login-new-user-btn-wrapper{
    text-align: end;
  }
</style>
