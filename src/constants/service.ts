export type Role = 'PATIENT' | 'DOCTOR' | 'STAFF';

export interface Department {
  departmentId: number;
  departmentName: string;
  hospitalId: number;
}

export interface Doctor {
  birthday: number;
  departmentId: number;
  doctorEmail: string;
  firstName: string;
  lastName: string;
  gender: string;
  hospitalId: string;
  title: string;
}

export interface Hospital {
  hospitalId: number;
  hospitalName: string;
}
