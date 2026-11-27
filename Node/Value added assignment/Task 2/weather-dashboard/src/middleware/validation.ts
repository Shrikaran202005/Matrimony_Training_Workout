import Joi from 'joi';

export const citiesQuerySchema = Joi.object({
  cities: Joi.string().trim().min(1).required()
});

export const cityParamSchema = Joi.object({
  city: Joi.string().trim().min(1).required()
});