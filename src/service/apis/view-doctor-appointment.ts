import ajax from '../base';
import { DoctorAppointment } from '@/constants';

type ViewDoctorAppointmentResponse = DoctorAppointment[];

export async function viewDoctorAppointment() {
  const res = await ajax<ViewDoctorAppointmentResponse>({
    auth: true,
    url: '/doctor/appointment',
  });
  return res;
}
