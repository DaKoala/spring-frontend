import ajax from '../base';
import { PatientAppointment } from '@/constants';

interface ViewPatientAppointmentRequest {
  patientEmail: string;
}

type ViewPatientAppointmentResponse = PatientAppointment[];

export async function viewPatientAppointment(data: ViewPatientAppointmentRequest) {
  const res = await ajax<ViewPatientAppointmentResponse>({
    auth: true,
    url: '/patient/appointment',
    data,
  });
  return res;
}
