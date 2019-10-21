import ajax from '../base';
import { Doctor } from '@/constants';

interface SearchDoctorRequest {
  hospitalId: string;
}

type SearchDoctorResponse = Doctor[];

export async function searchDoctor(data: SearchDoctorRequest) {
  const res = await ajax<SearchDoctorResponse>({
    url: '/hospital/doctor',
    data,
  });
  return res;
}
