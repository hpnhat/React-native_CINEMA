import Joi from "joi";

const movieValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  trailer: Joi.string().required().min(1),
  directors: Joi.array().items(Joi.string().required()).min(1).required(),
  actor: Joi.array().items(Joi.string().required()).min(1).required(),
  releaseDate: Joi.date().required(),
  endDate: Joi.date().required(),
  duration: Joi.number().positive().required(),
  genre: Joi.string().required(),
  ageRestriction: Joi.number().positive().integer().required(),
  views: Joi.number().positive().integer().optional(),
  rate: Joi.number().positive().optional(),
});

export default movieValidationSchema;
