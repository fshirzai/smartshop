import Joi from 'joi';

export const mongoId = Joi.string().hex().length(24);
export const email = Joi.string().email();
export const password = Joi.string().min(6);
