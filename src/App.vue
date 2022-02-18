<script>
import { RouterLink, RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import { defineComponent } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { getCurrentInstance } from 'vue'
export default defineComponent({
  components: {
    ElConfigProvider,
    RouterLink,
    RouterView
  },
  setup() {
    const { proxy } = getCurrentInstance()
    function change(type) {
      proxy.$i18n.locale = type
    }
    return {
      zIndex: 3000,
      size: 'small',
      locale: zhCn,
      change
    }
  }
})
</script>

<template>
  <el-config-provider :locale="locale" :size="size" :zIndex="zIndex" >
      <div class="wrapper">
        <el-button size="small" type="primary" class="bug-btn" @click="change('cn')">{{$t(`message.Home`)}}</el-button>
        <el-button size="small" type="primary" class="bug-btn" @click="change('en')">{{$t(`message.Title`)}}</el-button>
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/demo">About</RouterLink>
        </nav>
      </div>
    <RouterView />
  </el-config-provider>

</template>
