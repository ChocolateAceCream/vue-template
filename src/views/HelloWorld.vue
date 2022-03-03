<script>
import { reactive, toRefs, defineComponent, computed } from 'vue'
import { sessionStore } from '@/stores/sessionStore'
import { postLogin } from '@/api/auth'
import { getCurrentInstance } from 'vue'
import _ from 'lodash'

export default defineComponent({
  props: {
    msg: {
      type: String,
      required: false,
      default: '!!!!!!!!!!!!!!!'
    },
  },
  setup(props, ctx) {
    const store = sessionStore()
    store.$subscribe((mutation, state) => {
      console.log('-mutation-----', mutation)
      console.log('-state-----', state)
    })
    console.log('-store-----', store)
    const { proxy } = getCurrentInstance()
    const state = reactive({
      lodashDemo: _.partition([1, 2, 3, 4], n => n % 2),

      doubleCount: computed(() => {
        return store.doubleCount
      }),


      changeLang(type) {
        proxy.$i18n.locale = type
        store.userInfo.locale = type
      },
      change() {
        store.counter++
      },
      login() {
        // payload go here
        const data = {

        }
        postLogin(data, {
          // url params go here
          params: {
          },
          headers: {
            Authorization: 'Basic Y2xpZW50OjEyMzQ1Ng==',
            uuid: 'intellect_video_net_front'
          }
        }).then(res => {
          console.log('-------res--------', res)
        })
      }
    })
    return {...toRefs(state)}
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a target="_blank" href="https://vitejs.dev/">Vite</a> +
      <a target="_blank" href="https://vuejs.org/">Vue 3</a>.123123
      <svg-icon iconname="icon-a-zu665">asdfasdf</svg-icon>
    </h3>
    <div class="bb">bb</div>

    <div class="tt">
      {{doubleCount}}
      <div class="bb">bb</div>
    </div>

    <div class="long-shadow">aaaaaaaaaaaaa</div>
    <p>{{ $d(new Date(), 'short') }}</p>
    <p>{{ $d(new Date(), 'long', 'cn') }}</p>
    <div>{{lodashDemo}}</div>
    <el-button size="small" type="primary" class="bug-btn" @click="changeLang('cn')">中文</el-button>
    <el-button size="small" type="primary" class="bug-btn" @click="changeLang('en')">English</el-button>
    <el-button size="small" type="primary" class="bug-btn" @click="change">{{$t(`message.Home`)}}</el-button>
    <el-button  plain @click="login">LOGIN</el-button>
  </div>
</template>

<style lang="scss">
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

.bb {
  @include when-inside(".tt") {
    color: $font-color;
  }
}
.long-shadow {
  height: 100px;
  width: 100px;
  background: pink;
  @include longshadow(darken(green, 5%));
}
</style>
