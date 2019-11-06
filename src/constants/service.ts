export type Role = 'PATIENT' | 'DOCTOR' | 'STAFF' | 'HOSPITAL';

export type HealthInformation = Record<'allergy' | 'disease' | 'medicalHistory', string>;

interface AppointmentTimeSlot {
  date: string;
  startTime: string;
}

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
    healthInformation: string;
    email: string;
  };
  timeslot: AppointmentTimeSlot;
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
  timeslot: AppointmentTimeSlot;
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
