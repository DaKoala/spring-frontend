import ajax from '../base';
import { setToken } from '../cookie';
import { Role } from '@/constants';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  role: Role;
  token: string;
}

export async function login(data: LoginRequest) {
  const res = await ajax<LoginResponse>({
    url: '/login',
    method: 'POST',
    data,
  });
  if (res.success) {
    setToken(res.data.token);
  }
  return res;
}
