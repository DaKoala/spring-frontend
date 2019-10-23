import ajax from '../base';
import { TimeSlotFormat } from '@/constants';

interface ViewDoctorTimeSlotRequest {
  doctorEmail: string;
}

type ViewDoctorTimeSlotResponse = TimeSlotFormat[];

export async function viewDoctorTimeslot(data: ViewDoctorTimeSlotRequest) {
  const res = await ajax<ViewDoctorTimeSlotResponse>({
    url: '/timeslot/view',
    data,
  });
  return res;
}
