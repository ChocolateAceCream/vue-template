<template>
  <el-container class="layout-wrapper" >
    <el-aside width="220px"><left-bar /></el-aside>
      <el-container>
        <el-header ><top-bar></top-bar></el-header>
        <!-- <el-header style="--el-header-height: 30px"><top-bar></top-bar></el-header> -->
        <el-main><main-body></main-body></el-main>
      </el-container>
    </el-container>
</template>

<script>
import LeftBar from './LeftBar.vue'
import TopBar from './TopBar.vue'
// import TagsView from './TagsView.vue'
import MainBody from './MainBody.vue'
// import { getProfile } from '@/api/session'
import { reactive, toRefs, defineComponent, createVNode, computed } from 'vue'

export default defineComponent({
  components: {
    LeftBar, TopBar, MainBody
  },
  setup(props, ctx) {
    const state = reactive({})
    return { ...toRefs(state) }
  }
})
</script>

<style lang="scss" scoped>
.layout-wrapper{
  .el-header{
    --el-header-height: 30px;
  }
  height:100%
}

</style>

