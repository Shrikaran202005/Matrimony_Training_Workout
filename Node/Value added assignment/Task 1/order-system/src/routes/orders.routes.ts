import { Router, Request, Response, NextFunction } from 'express';
import { OrderService } from '../services/order.service';
import { AppError } from '../middleware/error-handler';
import { createOrderSchema, updateStatusSchema } from '../middleware/validation';

const router = Router();
const orderService = new OrderService();

// POST /orders - Create order
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = createOrderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const order = orderService.createOrder(value.items);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

// GET /orders/:id - Get order by ID
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = orderService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// GET /orders - List orders
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = req.query.status as string | undefined;
    const orders = orderService.getOrders(status);
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// PUT /orders/:id/status - Update status
router.put('/:id/status', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = updateStatusSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const order = orderService.updateOrderStatus(req.params.id, value.status);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

export default router;
