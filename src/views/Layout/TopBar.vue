<template>
  <el-row>
    <el-col :span="20">
      <breadcrumb class="breadcrumb" />
    </el-col>
    <!--右侧-->
    <el-col :span="4" class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <svg-icon class="top-bar-setting-icon" iconname="icon-setting" color="blue" :isColorVariable="true"/>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>
                修改密码
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span @click="handleLogout" style="display: block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { reactive, toRefs, defineComponent, createVNode, computed } from 'vue'
import { sessionStore } from '@/stores/sessionStore'
import Breadcrumb from './Breadcrumb.vue'
import _ from 'lodash'
export default defineComponent({
  components: {
    Breadcrumb
  },

  setup(props, ctx) {
    const router = useRouter()
    const route = useRoute()
    const store = sessionStore()

    const state = reactive({
      username: store.userInfo.username,
      handleLogout() {
        store.logout()
        router.push({name: 'auth/login'})
      }
    })
    return { ...toRefs(state) }
  }
})
</script>
<style module lang="scss" src="@/assets/styles/export.scss"></style>
<style lang="scss" scoped>
  .content {
    display: inline-block;
    .breadcrumb {
      padding-left: 10px;
      line-height: 30px;
    }
    @include mobile-device {
      display: none;
    }
  }

  .right-menu {
    //line-height: 28px;
    overflow: hidden;
    flex: 1;
    text-align: right;
    .top-bar-setting-icon {
      cursor: pointer;
      height: 30px;
      width: 30px;
    }
  }
</style>
