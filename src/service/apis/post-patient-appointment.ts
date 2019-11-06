import ajax from '../base';

interface PostPatientAppointmentRequest {
  doctorEmail: string;
  timeSlotId: number;
}

export async function postPatientAppointment(data: PostPatientAppointmentRequest) {
  return ajax({
    auth: true,
    url: '/patient/appointment',
    method: 'POST',
    data,
  });
}
