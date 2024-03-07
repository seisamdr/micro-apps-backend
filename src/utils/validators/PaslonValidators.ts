import Joi from "joi";

export const PaslonValidators = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  visimisi: Joi.string().required(),
  koalisi: Joi.string().required(),
});
