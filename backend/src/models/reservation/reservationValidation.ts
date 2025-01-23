import Joi from "joi";

export const reservationValidator = Joi.object({
    name: Joi.string().trim().required().messages({
        "string.empty": "Name is required",
        "any.required": "Name is required",
    }),
    phone: Joi.string()
        .pattern(/^\+?\d{10,15}$/)
        .required()
        .messages({
            "string.pattern.base": "Please enter a valid phone number",
            "string.empty": "Phone number is required",
            "any.required": "Phone number is required",
        }),
    email: Joi.string().email().required().messages({
        "string.email": "Please enter a valid email address",
        "string.empty": "Email is required",
        "any.required": "Email is required",
    }),
    date: Joi.date().iso().required().messages({
        "date.base": "Invalid date format",
        "any.required": "Date is required",
    }),
    time: Joi.string().required().messages({
        "string.empty": "Time is required",
        "any.required": "Time is required",
    }),
    guests: Joi.number().integer().min(1).max(20).required().messages({
        "number.base": "Guests should be a number",
        "number.min": "Minimum 1 guest is required",
        "number.max": "Maximum 20 guests allowed",
        "any.required": "Number of guests is required",
    }),
});
