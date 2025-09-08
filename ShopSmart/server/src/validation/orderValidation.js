import Joi from 'joi';

const addressSchema = Joi.object({
  address: Joi.string().required(),
  city: Joi.string().required(),
  postalCode: Joi.string().required(),
  country: Joi.string().required(),
});

export const createOrderSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      product: Joi.string().hex().length(24).required(),
      qty: Joi.number().integer().min(1).required(),
      price: Joi.number().min(0).required(),
    })
  ).min(1).required(),
  shippingAddress: addressSchema.required(),
});

export const updateStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'shipped', 'delivered').required(),
});
