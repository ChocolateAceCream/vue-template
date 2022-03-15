export const auth = {
  path: '/auth', name: 'auth', component: () => import('@/views/auth/index'),
  children: [
    { path: 'login', name: 'auth/login', component: () => import('@/views/auth/login') },
    { path: 'password', name: 'auth/password', component: () => import('@/views/auth/ResetPassword') },
    { path: 'register', name: 'auth/register', component: () => import('@/views/auth/RegisterUser') }
  ]
}
