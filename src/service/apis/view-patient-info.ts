import ajax from '../base';
import { userStoreInstance } from '@/stores/user';

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
  const { data } = res;
  userStoreInstance.setEmail(data.patientEmail);
  userStoreInstance.setFirstName(data.firstName);
  userStoreInstance.setLastName(data.lastName);
  userStoreInstance.setGender(data.gender);
  userStoreInstance.setBirthday(data.birthday);
  return res;
}
