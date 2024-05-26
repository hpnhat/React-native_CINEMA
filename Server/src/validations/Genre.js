import Joi from "joi";

export const genreValidator = Joi.object({
  name: Joi.string().required().min(2).max(255),
});
