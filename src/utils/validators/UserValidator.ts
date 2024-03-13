import Joi from "joi";

export const UserValidator = Joi.object({
  fullname: Joi.string().required(),
  address: Joi.string().required(),
  gender: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});
