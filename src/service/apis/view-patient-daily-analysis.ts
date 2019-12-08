import ajax from '../base';

export async function viewPatientDailyAnalysis() {
  const res = await ajax<string>({
    auth: true,
    url: '/patient/get_patient_daily_analysis',
  });
  return res;
}
