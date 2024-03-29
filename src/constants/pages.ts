export interface MyDoctorAppointment {
  key: string;
  id: number;
  name: string;
  gender: string;
  email: string;
  healthInfo: {
    allergy: string;
    disease: string;
    medicalHistory: string;
  };
  birthday: string;
  date: string;
  startTime: string;
}

export interface MyPatientAppointment {
  key: string;
  caseDescription: {
    symptoms: string;
    diagnoses: string;
    prescription: string;
  };
  id: number;
  hospital: string;
  department: string;
  doctor: string;
  date: string;
  timeSlotId: number;
  startTime: string;
  isIncoming: boolean;
}
