import {ReservationPayload} from "../queries/reservation.ts";
import {ApiResponse} from "../types.ts";
import {isAxiosError} from "axios";
import {client} from "../index.ts";

interface ReservationResponse {
    _id: string,
    name: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    guests: number;

}

export const addReservation = async (reservationPayload: ReservationPayload) => {
    try {
        const response = await client.post<ApiResponse<null>>(
            '/reservation',
            {
                name: reservationPayload.name,
                phone: reservationPayload.phone,
                email: reservationPayload.email,
                date: new Date(reservationPayload.date),
                time: reservationPayload.time,
                guests: reservationPayload.guests,
            }
        );

        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data.error.message);
        } else {
            throw new Error('something went wrong');
        }
    }
}

export const getReservations = async () => {
    try {
        const response = await client.get<ApiResponse<ReservationResponse[]>>('/reservation');

        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error?.response?.data.error.message);
        } else {
            throw new Error('something went wrong');
        }
    }
}