export const device = [
  { path: 'importDevice', name: 'importDevice', meta: { title: '设备管理', isMenu: true }, component: () => import('@/views/DeviceManagement/ImportDevice/index.vue') },
  { path: 'manufacturers', name: 'manufacturers', meta: { title: '厂商管理', isMenu: true }, component: () => import('@/views/DeviceManagement/ManufacturerManagement/index.vue') },
]
