import { defineStore, acceptHMRUpdate } from 'pinia'
// 'sessionStore' 是storeId，自己随便取，保证唯一
export const sessionStore = defineStore({
  id: 'sessionStore',
  state: () => {
    // 所有这些属性的类型都将被自动推断出来
    return {
      counter: 2,
      userInfo: {
        account: '',
        email: '',
        id: null,
        telno: '',
        status: null,
        isAdmin: true,
        username: '',
        locale: 'cn',
        accessToken: '',
      }
    }
  },
  getters: {
    doubleCount: (state) => state.counter * 2, // demo only
    isAuthenticated: (state) => {
      return state.userInfo.accessToken && state.userInfo.accessToken.length > 5
    }
  },
  actions: {
    setToken(token) {
      this.userInfo.accessToken = token
    },
    logout() {
      this.userInfo = {
        account: '',
        email: '',
        id: null,
        telno: '',
        status: null,
        isAdmin: true,
        username: '',
        locale: 'cn',
        accessToken: '',
      }
    },
    clearToken() {
      this.userInfo.accessToken = ''
    },
  },
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

// enable module hot reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(sessionStore, import.meta.hot))
}
