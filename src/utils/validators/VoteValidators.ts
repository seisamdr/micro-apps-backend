import Joi from "joi";

export const VoteValidators = Joi.object({
  paslon_id: Joi.number().required(),
  user_id: Joi.number().required(),
  vote: Joi.number().required(),
});
