// 对象的属性进行排序
import md5 from 'js-md5'
const SIGNATURE_SECRET = import.meta.env.VITE_APP_API_CAPABILITY_SIGNATURE_SECRET
// 对象的属性进行排序 计算sign签名
export function signObject(obj, reqConfig = {}) {
  const o = { ...obj }
  const keys = Object.keys(o)
  const strArr = [SIGNATURE_SECRET]
  const sortedKeys = keys.sort()
  sortedKeys.filter(key => o[key] || o[key] === 0).map(key => {
    if (o[key] instanceof Object) {
      strArr.push(key + JSON.stringify(o[key]))
    } else {
      strArr.push(key + o[key].toString())
    }
  })
  if (reqConfig.headers?.Authorization) {
    strArr.push(`token${reqConfig.headers?.Authorization}`)
  }
  strArr.push(SIGNATURE_SECRET)
  return md5(strArr.join('')).toUpperCase()
}

export function getSignature(reqConfig) {
  const { params, data } = reqConfig
  if (data instanceof Object) {
    const obj = {}
    if (data instanceof FormData) {
      const formData = {}
      data.forEach((value, key) => {
        // if (key != 'file' && value) { formData[key] = value }
        const isFile = value && (value instanceof File || value instanceof Blob)
        if (!isFile) {
          formData[key] = value
        }
      })
      Object.assign(obj, params, formData)
    } else {
      Object.assign(obj, params, { bodyContent: data })
    }
    return signObject(obj, reqConfig)
  } else {
    return signObject(params, reqConfig)
  }
}
