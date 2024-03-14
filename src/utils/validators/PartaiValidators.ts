import Joi from "joi";

export const PartaiValidators = Joi.object({
  image: Joi.string().required(),
  name: Joi.string().required(),
  leader: Joi.string().required(),
  visimisi: Joi.any().required(),
  address: Joi.string().required(),
  paslon: Joi.number().required(),
});
