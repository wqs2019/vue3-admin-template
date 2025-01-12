import { defineFakeRoute } from 'vite-plugin-fake-server/client';

const adminPermissionRouter = [
  {
    path: '/permissions',
    name: 'RtPermissions',
    meta: { title: '权限' },
    children: [
      {
        path: 'page',
        name: 'Page1',
        meta: { title: '页面一' },
      },
      {
        path: 'test-page-admin',
        name: 'Page2',
        meta: { title: '页面二' },
      },
    ],
  },
  {
    path: '/about',
    name: 'RtAdminInfo',
    meta: { title: '关于' },
    children: [
      {
        path: '',
        name: 'RtAbout',
        meta: { title: '关于' },
      },
    ],
  },
];

// permissionRouter

export default defineFakeRoute([
  {
    url: '/mock_api/getRoute',
    timeout: 0,
    method: 'post',
    response: () => {
      return {
        data: [...adminPermissionRouter],
        code: 200,
        message: 'ok',
      };
    },
  },
]);
