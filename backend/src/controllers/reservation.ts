import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { reservationValidator } from "../models/reservation/reservationValidation";
import { Reservation } from "../models/reservation/reservation";

export const createReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = reservationValidator.validate(req.body);
        if (error) {
            next(createError(400, error.details[0].message));
            return;
        }

        const newReservation = new Reservation(req.body);
        const savedReservation = await newReservation.save();

        res.status(201).json({ message: "Reservation created successfully", data: savedReservation });
    } catch (err) {
        next(createError(500, "Internal server error"));
    }
};

export const getAllReservations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json({ message: "Reservations retrieved successfully", data: reservations });
    } catch (err) {
        next(createError(500, "Internal server error"));
    }
};

export const getReservationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            next(createError(404, "Reservation not found"));
            return;
        }
        res.status(200).json({ message: "Reservation retrieved successfully", data: reservation });
    } catch (err) {
        next(createError(500, "Internal server error"));
    }
};

export const updateReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = reservationValidator.validate(req.body);
        if (error) {
            next(createError(400, error.details[0].message));
            return;
        }

        const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!updatedReservation) {
            next(createError(404, "Reservation not found"));
            return;
        }

        res.status(200).json({ message: "Reservation updated successfully", data: updatedReservation });
    } catch (err) {
        next(createError(500, "Internal server error"));
    }
};

export const deleteReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!deletedReservation) {
            next(createError(404, "Reservation not found"));
            return;
        }

        res.status(200).json({ message: "Reservation deleted successfully", data: deletedReservation });
    } catch (err) {
        next(createError(500, "Internal server error"));
    }
};
