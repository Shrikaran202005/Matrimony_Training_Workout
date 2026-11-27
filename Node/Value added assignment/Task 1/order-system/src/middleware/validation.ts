import Joi from 'joi';
import { CreateOrderRequest, UpdateOrderStatusRequest } from '../types';

export const createOrderSchema = Joi.object<CreateOrderRequest>({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).max(100).required()
      })
    )
    .min(1)
    .required()
});

export const updateStatusSchema = Joi.object<UpdateOrderStatusRequest>({
  status: Joi.string()
    .valid('Pending', 'Processing', 'Completed', 'Cancelled')
    .required()
});