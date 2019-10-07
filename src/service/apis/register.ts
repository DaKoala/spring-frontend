import ajax from '../base';
import { Role } from '@/constants';
import { setToken } from '../cookie';

interface RegisterRequest {
  email: string;
  password: string;
  role: Role;
}

interface RegisterResponse {
  role: Role;
  token: string;
}

export async function register(data: RegisterRequest) {
  const res = await ajax<RegisterResponse>({
    url: '/register',
    method: 'POST',
    data,
  });
  if (res.success) {
    setToken(res.data.token);
  }
  return res;
}
