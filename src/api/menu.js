import apiAxios from '@/utils/apiAxios'

export const getMenu = (...args) => apiAxios.get('/cwifi-vac-admin-provider/sys/menu/list', ...args)
export const saveMenu = (...args) => apiAxios.post('/cwifi-vac-admin-provider/sys/menu/save', ...args)
