import Joi from 'joi';

export const categorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(40).required(),
});
