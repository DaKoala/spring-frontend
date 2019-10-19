import ajax from '../base';

interface PostDoctorInfoRequest {
  firstName: string;
  lastName: string;
  doctorEmail: string;
  password: string;
  departmentId: number;
  title: string;
  birthday: string;
  gender: string;
}

export async function postDoctorInfo(data: PostDoctorInfoRequest) {
  const res = await ajax({
    url: '/hospital/doctor',
    auth: true,
    method: 'POST',
    data,
  });
  return res;
}
