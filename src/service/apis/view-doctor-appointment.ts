import ajax from '../base';
import { DoctorAppointment } from '@/constants';

interface ViewDoctorAppointmentRequest {
  doctorEmail: string;
}

type ViewDoctorAppointmentResponse = DoctorAppointment[];

export async function viewDoctorAppointment(data: ViewDoctorAppointmentRequest) {
  const res = await ajax<ViewDoctorAppointmentResponse>({
    auth: true,
    url: '/doctor/appointment',
    data,
  });
  return res;
}
