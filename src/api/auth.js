import apiAxios from '@/utils/apiAxios'

export const postLogin = (...args) => apiAxios.post('/cwifi-vac-admin-provider/sys/admin/login', ...args)
export const getVerificationCode = (...args) => apiAxios.get('/cwifi-vac-admin-provider/sys/auth/login/pic/captcha', ...args)
