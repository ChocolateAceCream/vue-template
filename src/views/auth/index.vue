<template>
  <div class="auth-wrapper">
    <router-view />
  </div>

</template>

<script>
import { reactive, toRefs, defineComponent } from 'vue'

export default defineComponent({
  setup(props, ctx) {
    const state = reactive({})
    return { ...toRefs(state) }
  },
})
</script>

<style lang="scss" scoped>
.auth-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  background: $lite-background;
}
</style>
