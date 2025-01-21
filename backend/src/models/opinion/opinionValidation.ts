import Joi from "joi";

export const opinionValidator = Joi.object({
    dish_id: Joi.string().required(),
    rating: Joi.number().min(0).max(5).required(),
    description: Joi.string(),
});
