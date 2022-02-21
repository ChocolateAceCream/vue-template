import apiAxios from '@/utils/apiAxios'

export const postLogin = (...args) => apiAxios.post('/auth', ...args)
