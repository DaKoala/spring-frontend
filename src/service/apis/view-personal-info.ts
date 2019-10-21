import ajax from '../base';
import { userStoreInstance } from '@/stores/user';

interface ViewPersonalInfoResponse {
  birthday: number;
  firstName: string;
  lastName: string;
  gender: string;
  healthInformation: Record<string, any>;
  patientEmail: string;
}

export async function viewPersonalInfo() {
  const res = await ajax<ViewPersonalInfoResponse>({
    auth: true,
    url: '/information',
  });
  const { data } = res;
  userStoreInstance.setEmail(data.patientEmail);
  userStoreInstance.setFirstName(data.firstName);
  userStoreInstance.setLastName(data.lastName);
  userStoreInstance.setGender(data.gender);
  userStoreInstance.setBirthday(data.birthday);
  return res;
}
