import { Schema, Document, model } from "mongoose";

interface IReservation extends Document {
    name: string;
    phone: string;
    email: string;
    date: Date;
    time: string;
    guests: number;
}

const ReservationSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            match: [/^\+?\d{10,15}$/, "Please enter a valid phone number"],
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        guests: {
            type: Number,
            required: true,
            min: 1,
            max: 20,
        },
    },
    { timestamps: true },
);

export const Reservation = model<IReservation>("reservation", ReservationSchema);
