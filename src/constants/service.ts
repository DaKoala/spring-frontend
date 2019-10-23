export type Role = 'PATIENT' | 'DOCTOR' | 'STAFF' | 'HOSPITAL';

export interface Department {
  departmentId: number;
  departmentName: string;
  hospitalId: string;
}

export interface TimeSlotFormat{
  date: string;
  startTime: string;
  seat: number;
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
  hospitalId: string;
  hospitalName: string;
}
