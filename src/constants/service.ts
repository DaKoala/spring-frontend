export type Role = 'PATIENT' | 'DOCTOR' | 'STAFF';

export interface Department {
  departmentId: number;
  departmentName: string;
  hospitalId: number;
}
