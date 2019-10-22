import ajax from '../base';

interface PostDepartmentRequest {
  departmentName: string;
}

export async function postDepartment(data: PostDepartmentRequest) {
  const res = await ajax({
    auth: true,
    method: 'POST',
    url: '/hospital/department',
    data,
  });
  return res;
}
