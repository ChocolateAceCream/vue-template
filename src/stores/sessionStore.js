import { defineStore } from 'pinia'
// 'main' 是storeId，自己随便取，保证唯一
export const sessionStore = defineStore('sessionStore', {
  state: () => ({
    counter: 2,
    name: 'Eduardo',
    isAdmin: true
  }),
  // ……
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        // paths: ['name', 'counter']
      }
    ]
  }

})
