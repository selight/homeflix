
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name: 'Home', component: () => import('pages/IndexPage.vue') },
    ],
    meta: { requireLogin: true }
  },
  {
    name: 'SignIn',
    path: '/SignIn',
    component: () => import('pages/SignIn.vue'),
    meta: { hideAuth: true }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
