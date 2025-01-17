import { getConfig } from '@/config';
import { usePermissionStoreHook } from '@/store/modules/permission';
import { useUserInfoStoreHook } from '@/store/modules/user';
import NProgress from '@/utils/plugin/progress';
import { _storage, isUrl } from '@jsxiaosi/utils';
import { createRouter, createWebHistory } from 'vue-router';
import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { configRouteList } from './modules';
import { handleAliveRoute, initRoute } from './utils';

const { whiteRouteModulesList, routeModulesList } = configRouteList();

// 在导航栏上的路由
export const sidebarRouteList = routeModulesList;

export const router = createRouter({
  history: createWebHistory(''),
  routes: whiteRouteModulesList as unknown as RouteRecordRaw[],
});

export const configMainRouter = async (app: App<Element>) => {
  app.use(router);
  await router.isReady();
};

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta?.keepAlive) {
    const newMatched = to.matched;
    handleAliveRoute(newMatched, 'add');
    // 页面整体刷新
    if (from.name === undefined || from.name === 'Redirect') {
      handleAliveRoute(newMatched);
    }
  }

  if (!isUrl(to.path) && to.meta.title) {
    const Title = getConfig().title;
    if (Title) {
      document.title = `${to.meta.title} | ${Title}`;
    } else {
      (document as any).title = to.meta.title;
    }
  }

  const userInfoStore = useUserInfoStoreHook();

  if (userInfoStore.userInfo) {
    // 已登陆状态不允许去登录页
    if (to.path === '/login') {
      next({
        path: from.path,
        query: from.query,
      });
      return;
    }

    if (from.name) {
      next();
    } else {
      // 页面刷新
      if (usePermissionStoreHook().wholeMenus.length === 0) {
        initRoute().then(routeData => {
          if (routeData?.length) {
            if (to.redirectedFrom) {
              router.push({
                path: to.redirectedFrom.path,
                query: to.redirectedFrom.query,
              });
            } else {
              router.push({
                path: to.path,
                query: to.query,
              });
            }
          } else {
            userInfoStore.removeUserInfo();
            router.push('/login');
          }
        });
      } else {
        next();
      }
    }
  } else {
    if (to.path !== '/login') {
      next({ path: '/login' });
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
