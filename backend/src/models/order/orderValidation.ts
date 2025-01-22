import Joi from "joi";
import {addressSchema} from "../address/addressValidation";

export const orderValidator = Joi.object({
    user: Joi.string().allow(null).optional(),  // Optional if the user is not logged in
    email: Joi.when('user', {
        is: Joi.exist(),
        then: Joi.forbidden(),
        otherwise: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'A valid email is required for guest users.',
                'any.required': 'Email is required for guest orders.',
            }),
    }),
    address: addressSchema.required().messages({
        'any.required': 'Address is required.',
    }),
    products: Joi.when('user', {
        is: Joi.exist(),
        then: Joi.forbidden(),
        otherwise: Joi.array().items(
            Joi.object({
                dishId: Joi.string().required(),
                quantity: Joi.number().min(1).required(),
            })
        ).min(1).required().messages({
            'array.min': 'At least one item is required.',
        }),
    }),
    total: Joi.when('user', {
        is: Joi.exist(),
        then: Joi.forbidden(),
        otherwise: Joi.number().min(0).required().messages({
            'any.required': 'Total amount is required.',
            'number.min': 'Total amount must be greater than or equal to 0.',
        }),
    })
});