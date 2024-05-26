import Joi from "joi";

export const cinemaValidator = Joi.object({
  name: Joi.string().required().min(2).max(255),
  location: Joi.string().required().min(6).max(255),
});
