import ajax from '../base';

interface PostDoctorTimeSlotRequest {
  seat: number;
  date: string;
  startTime: string;
}

export async function postDoctorTimeslot(data: PostDoctorTimeSlotRequest) {
  const res = await ajax({
    auth: true,
    url: '/timeslot/post',
    method: 'POST',
    data,
  });
  return res;
}
