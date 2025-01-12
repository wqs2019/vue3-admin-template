import { deffHttp } from '@/utils/axios';
import type { RoleEnum } from '@/enum/role';

export interface UseInfoType {
  name: string;
  userid: string;
  email: string;
  signature: string;
  introduction: string;
  title: string;
  token: string;
  tokenId: string;
  role: RoleEnum;
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
