import ajax from '../base';

interface ViewPatientInfoResponse {
  birthday: number;
  firstName: string;
  lastName: string;
  gender: string;
  healthInformation: Record<string, any>;
  patientEmail: string;
}

export async function viewPatientInfo() {
  const res = await ajax<ViewPatientInfoResponse>({
    auth: true,
    url: '/patient/information',
  });
  return res;
}
