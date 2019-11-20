import ajax from '../base';

interface AddPatientCaseReportRequest {
  appointmentId: number;
  caseDescription: Record<string, any>;
}

export async function addPatientCaseReport(data: AddPatientCaseReportRequest) {
  return ajax({
    auth: true,
    method: 'POST',
    url: '/doctor/case_report',
    data,
  });
}
