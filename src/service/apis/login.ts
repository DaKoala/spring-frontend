import ajax from '../base';
import { Role } from '@/constants';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  role: Role;
  token: string;
}

export function login(data: LoginRequest) {
  return ajax<LoginResponse>({
    url: '/login',
    method: 'POST',
    data,
  });
}
