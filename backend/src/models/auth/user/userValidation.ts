import Joi from "joi";

export const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .regex(/^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)
        .required(),
});

export const registerUserValidator = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string()
        .regex(/^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                if (err.code === "string.pattern.base") {
                    err.message =
                        "Password must be at least 8 characters long and contain at least one special character.";
                }
            });
            return errors;
        }),
});
