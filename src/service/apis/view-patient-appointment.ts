import ajax from '../base';
import { PatientAppointment } from '@/constants';

type ViewPatientAppointmentResponse = PatientAppointment[];

export async function viewPatientAppointment() {
  const res = await ajax<ViewPatientAppointmentResponse>({
    auth: true,
    url: '/patient/appointment',
  });
  return res;
}
