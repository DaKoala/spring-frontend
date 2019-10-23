import ajax from '../base';
import { userStoreInstance } from '@/stores/user';

interface PatientInfo {
  birthday: number;
  firstName: string;
  lastName: string;
  gender: string;
  healthInformation: Record<string, any>;
  patientEmail: string;
}

interface DoctorInfo {
  birthday: number;
  departmentId: number;
  departmentName: string;
  doctorEmail: string;
  firstName: string;
  lastName: string;
  gender: string;
  hospitalId: string;
  title: string;
}

interface HospitalInfo {
  hospitalId: string;
  hospitalName: string;
}

type ViewPersonalInfoResponse = PatientInfo | DoctorInfo | HospitalInfo;

function isPatient(res: ViewPersonalInfoResponse): res is PatientInfo {
  return Boolean((res as PatientInfo).patientEmail);
}

function isDoctor(res: ViewPersonalInfoResponse): res is DoctorInfo {
  return Boolean((res as DoctorInfo).doctorEmail);
}

export async function viewPersonalInfo() {
  const res = await ajax<ViewPersonalInfoResponse>({
    auth: true,
    url: '/information',
  });
  const { data } = res;
  if (isPatient(data)) {
    userStoreInstance.setRole('PATIENT');
    userStoreInstance.setEmail(data.patientEmail);
    userStoreInstance.setFirstName(data.firstName);
    userStoreInstance.setLastName(data.lastName);
    userStoreInstance.setGender(data.gender);
    userStoreInstance.setBirthday(data.birthday);
  } else if (isDoctor(data)) {
    userStoreInstance.setRole('DOCTOR');
    userStoreInstance.setBirthday(data.birthday);
    userStoreInstance.setDepartmentId(data.departmentId);
    userStoreInstance.setDepartmentName(data.departmentName);
    userStoreInstance.setEmail(data.doctorEmail);
    userStoreInstance.setFirstName(data.firstName);
    userStoreInstance.setLastName(data.lastName);
    userStoreInstance.setGender(data.gender);
    userStoreInstance.setHospitalId(data.hospitalId);
    userStoreInstance.setTitle(data.title);
  } else {
    userStoreInstance.setRole('HOSPITAL');
    userStoreInstance.setHospitalId(data.hospitalId);
    userStoreInstance.setHospitalName(data.hospitalName);
  }

  return res;
}
