import { useActions } from '../../store/hooks.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addReservation, getReservations } from '../services/reservation.ts';

export interface ReservationPayload {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
}

export const useAddReservation = () => {
  const { notificationSend } = useActions();

  return useMutation({
    mutationFn: (reservationPayload: ReservationPayload) =>
      addReservation(reservationPayload),
    onSuccess: () => {
      notificationSend('success', {
        title: 'Reservation is created',
        description: 'Reservation is created successfully',
      });
    },
    onError: (error) => {
      notificationSend('error', {
        title: "Reservation can't be created",
        description: error.message,
      });
    },
  });
};

export const useGetReservations = () => {
  return useQuery({
    queryKey: ['reservations'],
    queryFn: getReservations,
    refetchOnWindowFocus: true,
  });
};
