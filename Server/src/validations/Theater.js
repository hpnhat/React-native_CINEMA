import Joi from "joi";

export const theaterValidation = Joi.object({
  name: Joi.string().required().min(1),
  maxColumns: Joi.number().integer().min(1).required(),
  maxRows: Joi.number().integer().min(1).required(),
  rows: Joi.array().items(
    Joi.object({
      nameSeat: Joi.string().required(),
      index: Joi.number().integer().required(),
      type: Joi.string().valid("Standard", "Couple", "VIP").required(),
      seats: Joi.array().items(
        Joi.object({
          area: Joi.number().integer().required(),
          column: Joi.number().integer().required(),
          row: Joi.number().integer().required(),
          status: Joi.number().integer().valid(0, 1).default(0),
          ticketPrice: Joi.number().min(0).required(),
          description: Joi.string().required().min(1),
          seatsInGroup: Joi.array().items(
            Joi.object({
              area: Joi.number().integer().required(),
              row: Joi.number().integer().required(),
              column: Joi.number().integer().required(),
            })
          ),
        })
      ),
    })
  ),
  status: Joi.boolean().default(true),
});



