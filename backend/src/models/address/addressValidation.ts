import Joi from "joi";

export const addressSchema = Joi.object({
    street: Joi.string().required().messages({
        "any.required": "Street is required.",
        "string.empty": "Street cannot be empty.",
    }),
    city: Joi.string().required().messages({
        "any.required": "City is required.",
        "string.empty": "City cannot be empty.",
    }),
    state: Joi.string().required().messages({
        "any.required": "State is required.",
        "string.empty": "State cannot be empty.",
    }),
    zipcode: Joi.string()
        .pattern(/^\d{5}(-\d{4})?$/)
        .required()
        .messages({
            "any.required": "Zipcode is required.",
            "string.pattern.base": "Invalid zipcode format.",
        }),
    country: Joi.string().required().messages({
        "any.required": "Country is required.",
        "string.empty": "Country cannot be empty.",
    }),
});
