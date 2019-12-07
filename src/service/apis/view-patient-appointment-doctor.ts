import ajax from '../base';
import { PatientAppointment } from '@/constants';

interface ViewPatientAppointmentDoctorRequest {
    patientEmail: string;
  }

type ViewPatientAppointmentDoctorResponse = PatientAppointment[];

export async function viewPatientAppointmentDoctor(data: ViewPatientAppointmentDoctorRequest) {
  const res = await ajax<ViewPatientAppointmentDoctorResponse>({
    auth: true,
    url: '/doctor/appointment/patient',
    data,
  });
  return res;
}
