import { deffHttp } from '@/utils/axios';

enum Api {
  ROUTE_LIST = '/mock_api/getRoute',
}

//   ROUTE_LIST = '/v1/user/menus_by_code/trc',

interface Param {
  name: string;
}

export interface RouteDataItemType {
  path: string;
  name: string;
  children: RouteDataItemType[];
}

export const getRouteApi = (data: Param) => deffHttp.post<RouteDataItemType[], Param>({ url: Api.ROUTE_LIST, data });
