import Layout from '@/layouts/page-layouts/index.vue';
import { getRouteApi } from '@/server/route';
import { usePermissionStoreHook } from '@/store/modules/permission';
import { isUrl } from '@jsxiaosi/utils';
import { useTimeoutFn } from '@vueuse/core';
import type { RouteRecordName, RouteRecordNormalized, RouteRecordRaw } from 'vue-router';
import { router, sidebarRouteList } from './index';
import type { AppRouteRecordRaw, Meta } from './type';
const modules = import.meta.glob('@/views/**/*.vue');

// 初始化权限路由
export async function initRoute() {
  const { clearAllCachePage, setWholeMenus } = usePermissionStoreHook();
  resetRouter();
  clearAllCachePage();
  let routeList: AppRouteRecordRaw[] = [];
  routeList = await getAsyncRoute();
  privilegeRouting(routeList);
  setWholeMenus(routeList);
  return routeList;
}

function formatChildRoutes(childRoutes: any) {
  return childRoutes?.map((route: any) => {
    return {
      redirect: route.redirect,
      name: route.code,
      path: route.route || route.index,
      meta: route.meta,
      component: modules[`/src/views${route.route}/index.vue`],
      children: route.children ? formatChildRoutes(route.children) : undefined,
    };
  });
}

function formatParentRoutes(routes: any) {
  return routes?.map((route: any) => {
    // 父路由使用 Layout 组件
    return {
      redirect: route.redirect,
      name: route.code,
      path: route.route,
      meta: route.meta,
      component: Layout,
      children: route.children || undefined,
    };
  });
}

function formatAllRoutes(routes: any) {
  const parentRoutes = formatParentRoutes(routes);
  parentRoutes.forEach((parentRoute: any) => {
    if (parentRoute.children) {
      parentRoute.children = formatChildRoutes(parentRoute.children);
    }
  });
  console.log('parentRoutes', parentRoutes);

  return parentRoutes;
}

// 获取后端路由
async function getAsyncRoute() {
  const res = await getRouteApi();
  if (res.data) {
    return formatAllRoutes(res.data?.children || []);
  } else {
    console.error('No requested route');
    return [];
  }
}

// 添加后端返回的路由到列表表注册
function privilegeRouting(dataRouter: AppRouteRecordRaw[]) {
  dataRouter?.forEach(item => {
    router.addRoute(item as RouteRecordRaw);
  });
}

// 拼接路径 path
function pathResolve(...paths: string[]) {
  let resolvePath = '';
  let isAbsolutePath = false;
  for (let i = paths.length - 1; i > -1; i--) {
    const path = paths[i];
    if (isAbsolutePath) {
      break;
    }
    if (!path) {
      continue;
    }
    resolvePath = `${path}/${resolvePath}`;
    isAbsolutePath = path.charCodeAt(0) === 47;
  }
  if (/^\/+$/.test(resolvePath)) {
    resolvePath = resolvePath.replace(/(\/+)/, '/');
  } else {
    resolvePath = resolvePath
      .replace(/(?!^)\w+\/+\.{2}\//g, '')
      .replace(/(?!^)\.\//g, '')
      .replace(/\/+$/, '');
  }
  return resolvePath;
}

// 按照路由中meta下的rank等级升序来排序路由
// function sortRouteList(arr: any[]) {
//   arr.forEach(v => {
//     if (v?.meta?.rank === null) v.meta.rank = undefined;
//     if (v.children) {
//       v.children = sortRouteList(v.children);
//     }
//   });
//   return arr.sort((a: { meta: { position: number } }, b: { meta: { position: number } }) => {
//     return a?.meta?.position - b?.meta?.position;
//   });
// }

// 匹配不被清除的文件夹和文件
export function pathNamekeyCheck(key: string, whiteCatalogue: string[]) {
  const pathName = key.split('/')[1];
  const index = whiteCatalogue.findIndex((i: string) => {
    if (pathName.indexOf(i) !== -1) {
      if (pathName === i) return true;
      else if (/^[\s\S]*\.(ts|tsx|js|jsx)$/.test(pathName)) {
        return true;
      }
      return false;
    }
    return false;
  });
  return index !== -1;
}

// 扁平路由
export function formatFlatteningRoutes(routesList: AppRouteRecordRaw[]) {
  if (routesList.length === 0) return routesList;
  let hierarchyList = routesList;
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList.slice(0, i + 1).concat(hierarchyList[i].children || [], hierarchyList.slice(i + 1));
    }
  }
  return hierarchyList;
}

// 设置路由path,并创建路由层级
export function setUpRoutePath(routeList: AppRouteRecordRaw[], pathName = '', pathList: number[] = []) {
  for (const [key, node] of routeList.entries()) {
    node.meta = { ...(node.meta as Meta), pathList: [...pathList, key] };
    if (pathName && !isUrl(node.path)) {
      node.path = pathResolve(pathName, node.path || '');
    }
    if (node.children && node.children.length) {
      setUpRoutePath(node.children, node.path, node.meta?.pathList);
    }
  }
  return routeList;
}

// 处理缓存路由（添加、删除、刷新）
export function handleAliveRoute(matched: RouteRecordNormalized[], mode?: string) {
  const { cacheOperate } = usePermissionStoreHook();
  const name: RouteRecordName = matched[matched.length - 1].name as RouteRecordName;
  switch (mode) {
    case 'add':
      matched.forEach((v: RouteRecordNormalized) => {
        cacheOperate({ mode: 'add', name: v.name as RouteRecordName });
      });
      break;
    case 'delete':
      cacheOperate({
        mode: 'delete',
        name,
      });
      break;
    default:
      cacheOperate({
        mode: 'delete',
        name,
      });
      useTimeoutFn(() => {
        matched.forEach((v: RouteRecordNormalized) => {
          cacheOperate({ mode: 'add', name: v.name as RouteRecordName });
        });
      }, 100);
  }
}

// 通过path获取父级路径
export function getParentPaths(routePath: string, routes: AppRouteRecordRaw[]) {
  // 深度遍历查找
  function dfs(routes: AppRouteRecordRaw[], path: string, parents: string[]) {
    for (let i = 0; i < routes.length; i++) {
      const item = routes[i];
      // 找到path则返回父级path
      if (item.path === path) return [item.path];
      // children不存在或为空则不递归
      if (!item.children || !item.children.length) continue;
      // 往下查找时将当前path入栈
      parents.push(item.path);

      if (dfs(item.children, path, parents).length) return parents;
      // 深度遍历查找未找到时当前path 出栈
      parents.pop();
    }
    // 未找到时返回空数组
    return [];
  }
  return dfs(routes, routePath, []);
}

// 查找对应path的路由信息
export function findRouteByPath(path: string, routes: AppRouteRecordRaw[]): AppRouteRecordRaw | null {
  const res = routes.find((item: { path: string }) => item.path === path) || null;
  if (res) {
    return res;
  } else {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].children instanceof Array && routes[i].children?.length) {
        const miRes = findRouteByPath(path, routes[i].children as AppRouteRecordRaw[]);
        if (miRes) {
          return miRes;
        } else {
          if (routes[i].path === path) return routes[i];
        }
      }
    }
    return null;
  }
}

// 重置路由 不重置白名单
export function resetRouter() {
  sidebarRouteList.forEach(route => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}
