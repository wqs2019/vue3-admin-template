import { deffHttp } from '@/utils/axios';

enum Api {
  ROUTE_LIST = '/mock_api/getRoute',
  ROUTE_LIST2 = '/v1/user/menus_by_code/trc',
}
export interface RouteDataItemType {
  path: string;
  name: string;
  children: RouteDataItemType[];
}

export const getRouteApi = () => deffHttp.post<RouteDataItemType[]>({ url: Api.ROUTE_LIST });
export const getRouteApi2 = () => deffHttp.get<any[]>({ url: Api.ROUTE_LIST2 });
