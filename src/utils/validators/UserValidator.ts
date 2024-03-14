import Joi from "joi";
import { Roles } from "../../entity/User";

export const UserValidator = Joi.object({
  fullname: Joi.string().required(),
  address: Joi.string().required(),
  gender: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid(Roles.Admin, Roles.User).required(),
});
