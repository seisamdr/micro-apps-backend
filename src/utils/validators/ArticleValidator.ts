import Joi from "joi";

export const ArticleValidator = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
  date: Joi.date().required(),
  image: Joi.string().required(),
});
