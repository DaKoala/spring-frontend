import ajax from '../base';
import { Doctor } from '@/constants';

interface SearchDoctorByDepartmentRequest {
  departmentId: number;
}

type SearchDoctorByDepartmentResponse = Doctor[];

export async function searchDoctorByDepartment(data: SearchDoctorByDepartmentRequest) {
  return ajax<SearchDoctorByDepartmentResponse>({
    url: '/doctor/search',
    data,
  });
}
