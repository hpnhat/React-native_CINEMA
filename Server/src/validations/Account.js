import Joi from "joi";

export const signUpValidator = Joi.object({
  fullName: Joi.string().required().min(2).max(255),
  birthDate: Joi.date().required(),
  gender: Joi.string().required(),
  email: Joi.string().email().required().min(2).max(255),
  phone: Joi.number().required().min(10),
  password: Joi.string().required().min(6).max(255),
  role: Joi.string(),
});

export const signInValidator = Joi.object({
  phone: Joi.string().required().min(2).max(255),
  password: Joi.string().required().min(6).max(255),
});
