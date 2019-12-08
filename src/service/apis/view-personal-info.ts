import ajax from '../base';
import { HealthInformation } from '@/constants';
import { userStoreInstance } from '@/stores/user';

interface PatientInfo {
  birthday: number;
  firstName: string;
  lastName: string;
  gender: string;
  healthInformation: string;
  patientEmail: string;
}

interface DoctorInfo {
  birthday: number;
  department: {
    departmentId: number;
    departmentName: string;
  };
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
    userStoreInstance.setHealthInformation(JSON.parse(data.healthInformation));
  } else if (isDoctor(data)) {
    userStoreInstance.setRole('DOCTOR');
    userStoreInstance.setBirthday(data.birthday);
    userStoreInstance.setDepartmentId(data.department.departmentId);
    userStoreInstance.setDepartmentName(data.department.departmentName);
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
