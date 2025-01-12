import type { AppRouteRecordRaw } from '@/router/type';

const about: AppRouteRecordRaw[] = [
  {
    path: '/about',
    redirect: '/about/index',
    name: 'RtAdminInfo',
    meta: {
      title: '关于',
      icon: 'about',
      alwaysShow: false,
      position: 11,
    },
    children: [
      {
        path: 'index',
        name: 'RtAbout',
        component: () => import('@/views/about/index.vue'),
        meta: { title: '关于' },
      },
    ],
  },
];

export default about;
