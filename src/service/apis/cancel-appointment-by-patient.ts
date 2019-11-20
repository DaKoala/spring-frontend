import ajax from '../base';

interface CancelAppointmentByPatientRequest {
  timeSlotId: number;
  appointmentId: number;
}

export async function cancelAppointmentByPatient(data: CancelAppointmentByPatientRequest) {
  return ajax({
    auth: true,
    method: 'POST',
    url: '/patient/cancel_appointment',
    data,
  });
}
