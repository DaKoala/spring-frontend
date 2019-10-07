import ajax from '../base';

interface PostPatientInfoRequest {
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  healthInformation: Record<string, any>;
}

export function postPatientInfo(data: PostPatientInfoRequest) {
  return ajax({
    url: '/patient/information',
    method: 'POST',
  });
}
