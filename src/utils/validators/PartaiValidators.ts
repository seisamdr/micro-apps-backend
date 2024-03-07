import Joi from "joi";

export const PartaiValidators = Joi.object({
  name: Joi.string().required(),
  leader: Joi.string().required(),
  visimisi: Joi.string().required(),
  address: Joi.string().required(),
  logo: Joi.string().required(),
});
