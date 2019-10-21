import ajax from '../base';
import { Department } from '@/constants';
import { userStoreInstance } from '@/stores/user';

interface ViewDepartmentRequest {
  hospitalId: string;
}

type ViewDepartmentResponse = Department[];

export async function viewDepartment(data: ViewDepartmentRequest) {
  const res = await ajax<ViewDepartmentResponse>({
    url: '/hospital/department',
    data,
  });
  userStoreInstance.setDepartments(res.data);
  return res;
}
