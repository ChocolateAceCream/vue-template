export const auth = {
  path: '/auth', name: 'auth', component: () => import('@/views/auth/index'),
  children: [
    { path: 'login', name: 'auth/login', component: () => import('@/views/auth/login') },
    { path: 'forgetPassword', name: 'auth/forgetPassword', component: () => import('@/views/auth/forgetPassword') }
  ]
}
