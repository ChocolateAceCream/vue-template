<template>
  <img class="verification-code" :src="imageUrl" alt="" @click="getUrl">
</template>

<script lang='jsx'>
import { reactive, toRefs, defineComponent } from 'vue'
import { getVerificationCode } from '@/api/auth'

export default defineComponent({
  expose: ['getUrl'],
  setup(props, ctx) {
    const state = reactive({
      imageUrl: '',
      async getUrl() {
        const {data: resData} = await getVerificationCode({
          // responseType: 'arraybuffer'
        })
        state.imageUrl = resData.data.imgdata
      }
    })
    state.getUrl()
    return { ...toRefs(state) }
  },
})
</script>

<style lang="scss" scoped>
.verification-code {
  width: 80px;
  height: 30px;
  border-radius: 2px;
  cursor: pointer;
}
</style>
