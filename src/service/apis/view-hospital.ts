import ajax from '../base';
import { Hospital } from '@/constants';

type ViewHospitalResponse = Hospital[];

export async function viewHospital() {
  const res = await ajax<ViewHospitalResponse>({
    url: '/hospital/list',
  });
  return res;
}
