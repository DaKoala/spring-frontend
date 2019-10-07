import ajax from '../base';

interface PostPatientInfoRequest {
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  healthInformation: Record<string, any>;
}

export async function postPatientInfo(data: PostPatientInfoRequest) {
  const res = await ajax({
    auth: true,
    url: '/patient/information',
    method: 'POST',
    data,
  });
  return res;
}
