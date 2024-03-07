import Joi from "joi";

export const VoteValidators = Joi.object({
  paslon_id: Joi.string().required(),
  user_id: Joi.string().required(),
  vote: Joi.number().required(),
});
