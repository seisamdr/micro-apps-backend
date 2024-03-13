import Joi from "joi";

export const PartaiValidators = Joi.object({
  image: Joi.string().required(),
  name: Joi.string().required(),
  leader: Joi.string().required(),
  visimisi: Joi.string().required(),
  address: Joi.string().required(),
});
