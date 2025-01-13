import type { AppRouteRecordRaw } from '@/router/type';

const Layout = () => import('@/layouts/page-layouts/index.vue');

const root: Array<AppRouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/welcome', // 跟目录重定向的路径在这里修改
    name: 'RtRoot',
    meta: {
      title: '首页',
      icon: 'el-home-filled',
    },
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
  },
  {
    path: '/welcome',
    component: () => import('@/views/welcome/index.vue'),
    name: 'welcome',
  },
  {
    path: '/redirect',
    component: Layout,
    meta: { title: '', icon: 'home-filled' },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/layouts/redirect/index.vue'),
      },
    ],
  },
  { path: '/:path(.*)', redirect: '/error/404' },
];

export default root;
