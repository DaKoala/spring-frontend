export type Role = 'PATIENT' | 'DOCTOR' | 'STAFF' | 'HOSPITAL';

export interface Department {
  departmentId: number;
  departmentName: string;
  hospitalId: string;
}

export interface TimeSlotFormat{
  doctorEmail: string;
  date: number;
  startTime: string;
  seat: number;
  timeSlotId: number;
}

export interface DoctorAppointment{
  appointmentId: number;
  patient: {
    birthday: string;
    firstName: string;
    lastName: string;
    gender: string;
    healthInformation: {
      allergy: string;
      disease: string;
      medicalHistory: string;
    };
    email: string;
  };
  timeslot: {
    date: string;
  };
}

export interface PatientAppointment{
  appointmentId: number;
  department: {
    departmentName: string;
  };
  doctor: {
    firstName: string;
    lastName: string;
  };
  hospital: {
    hospitalName: string;
  };
  timeslot: {
    date: string;
  };
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
