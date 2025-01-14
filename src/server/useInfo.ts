import { deffHttp } from '@/utils/axios';

// TODO: 需要补充用户信息
export interface UseInfoType {
  name: string; // 用户名
  userName: string; // 用户名
  nickName: string; // 昵称
  id: number; // id
  role: {
    menus: { children: { label: string; name: string; position: number; meta: { icon: string; title: string } }[] };
    name: string;
    remark: string;
    status: number;
  }; // 五中心菜单
  tokenId: string; // 登录token
  userRole: number; // 用户角色
}

export interface UserParams {
  userName: string;
  userPass: string;
}

export const getUserInfo = (user: string, pwd: string) =>
  deffHttp.post<UseInfoType, UserParams>(
    {
      url: '/v1/login',
      data: { userName: user, userPass: pwd },
    },
    { errorMessageMode: 'modal', withToken: false },
  );
