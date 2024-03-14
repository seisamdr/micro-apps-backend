import Joi from "joi";

export const PaslonValidators = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  visimisi: Joi.any().required(),
  koalisi: Joi.any().required(),
  partai: Joi.number().required(),
});
