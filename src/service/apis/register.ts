import ajax from '../base';
import { Role } from '@/constants';

interface RegisterRequest {
  email: string;
  password: string;
  role: Role;
}

export function register(data: RegisterRequest) {
  return ajax({
    url: '/register',
    method: 'POST',
    data,
  });
}
