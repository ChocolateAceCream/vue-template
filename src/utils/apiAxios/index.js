import axios from 'axios'
import supportCancelToken from './cancelToken'
import { getSignature } from './signature'
import { sessionStore } from '@/stores/sessionStore'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'

// 创建 api 实例
const apiAxios = new Proxy(axios.create({
  // https://cn.vitejs.dev/guide/env-and-mode.html
  baseURL: import.meta.env.VITE_APP_API_BASE_URL || '/',
  timeout: 1000 * 60
}), {
  get(target, ...args) {
    return Reflect.get(target, ...args) || Reflect.get(axios, ...args)
  }
})
// apiAxios.CancelToken = axios.CancelToken
// apiAxios.isCancel = axios.isCancel
// Object.keys(axios).forEach(key => {
//  if (axios.hasOwnProperty(key) && !apiAxios.hasOwnProperty(key)) {
//    apiAxios[key] = axios[key]
//  }
// })
apiAxios.defaults.meta = {
  // 请求重试
  retry: 0/* times*/, retryDelay: 100/* ms*/, curRetry: 0/* times*/,
  // 断开相同请求，判断条件 如果!!cancelToken存在 则计算config.url+cancelToken的值作为唯一key值，key值相同，则断开之前请求
  cancelToken: '',
  withProgressBar: false,
}
// 设置 post 请求头
apiAxios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

supportCancelToken(apiAxios)

// 请求拦截
apiAxios.interceptors.request.use(config => {
  if (config.meta?.withProgressBar) { NProgress.start() }
  const store = sessionStore()

  const accessToken = store.token || ''
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  if (!Object.prototype.hasOwnProperty.call(config.params || {}, 'sign')) {
    const sign = getSignature(config)
    config.params = { sign, ...config.params }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
apiAxios.interceptors.response.use(res => {
  if (res.config.meta?.withProgressBar) { NProgress.done() }
  // 请求成功
  if (`${res.data.errorCode}` !== '0') {
    if (!Object.prototype.hasOwnProperty.call(res.data, 'errorCode') && !Object.prototype.hasOwnProperty.call(res.data, 'errorMsg')) {
      return Promise.resolve(res)
    }
    ElMessage({
      message: res.data.errorMsg || res.data,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(res.data)
  }
  return Promise.resolve(res)
}, error => {
  // 请求失败
  if (axios.isCancel(error)) {
    console.error('主动取消')
  } else {
    const config = error.config
    if (config?.meta && config.meta.curRetry !== config.meta.retry) {
      config.meta.curRetry++
      return new Promise(resolve => {
        setTimeout(() => {
          console.warn(`${config.url},请求重试: ${config.meta.curRetry}次`)
          resolve(apiAxios(config))
        }, config.meta.retryDelay, 1000)
      })
    }
  }
  return Promise.reject(error)
})
export default apiAxios
