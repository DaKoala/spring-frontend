import ajax from '../base';

export function viewPatientInfo() {
  return ajax({
    url: '/patient/information',
  });
}
