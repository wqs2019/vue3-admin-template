import { deffHttp } from '@/utils/axios';

enum Api {
  ROUTE_LIST = '/v1/user/menus_by_code/trc',
}
export interface RouteDataItemType {
  path: string;
  name: string;
  children: RouteDataItemType[];
}

export const getRouteApi = () => deffHttp.get<any[]>({ url: Api.ROUTE_LIST });
