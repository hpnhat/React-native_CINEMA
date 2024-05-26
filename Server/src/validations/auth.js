import Joi from "joi";

export const signUpValidator = Joi.object({
  lastName: Joi.string().required().min(2).max(255),
  firstName: Joi.string().required().min(2).max(255),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6).max(255),
  role: Joi.string(),
});

export const signInValidator = Joi.object({
  email: Joi.string().required().email().min(2).max(255),
  password: Joi.string().required().min(6).max(255),
});
