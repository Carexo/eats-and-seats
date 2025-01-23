import type { Dayjs } from 'dayjs';

export interface ReservationFormValues {
  name: string;
  phone: string;
  email: string;
  date: Dayjs;
  time: Dayjs;
  guests: number;
}
