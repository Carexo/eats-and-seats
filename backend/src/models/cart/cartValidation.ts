import Joi from "joi";

export const cartValidation = Joi.object({
    dishId: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
});
