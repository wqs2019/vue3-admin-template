/* Layout */
// import Layout from '@/layouts/index.vue'
// import AppMain from '@/layouts/components/AppMain/index.vue'
import type { AppRouteRecordRaw } from '@/router/type';

const safeManagerRoutes: Array<AppRouteRecordRaw> = [
  {
    path: '/welcome',
    name: 'RtWelcome',
    component: () => import('@/views/index/index.vue'),
    meta: {
      title: '首页',
      icon: 'iEL-home-filled',
      position: 1,
      keepAlive: true,
    },
  },
];

export default safeManagerRoutes;
