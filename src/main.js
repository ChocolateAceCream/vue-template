import { createApp } from 'vue'

import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

import './assets/styles/element-variables.scss'

import './assets/styles/application.scss'

import '@/assets/iconfont/iconfont.js'

import SvgIcon from '@/components/SvgIcon/Index.vue'

import App from './App.vue'
import router from './router'
import i18n from './locales'
import globalComponents from './components/shared'

const app = createApp(App)

// piania persistent
const store = createPinia()
store.use(piniaPluginPersist)
app.use(store)

app.use(router)
app.use(i18n)
app.use(globalComponents)
app.component('svg-icon', SvgIcon)
app.mount('#app')
