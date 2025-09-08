import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(120).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().integer().min(0).required(),
  category: Joi.string().required(),
  images: Joi.array().items(Joi.string().uri()).max(5).optional(),
});

export const updateProductSchema = createProductSchema.fork(
  ['name', 'description', 'price', 'stock', 'category'],
  (schema) => schema.optional()
);
