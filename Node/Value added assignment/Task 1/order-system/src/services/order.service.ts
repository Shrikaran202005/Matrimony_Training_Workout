import { v4 as uuidv4 } from 'uuid';
import { Product, Order, OrderItem } from '../types';
import { config } from '../config/config';
import { AppError } from '../middleware/error-handler';

export class OrderService {
  private products: Product[] = [
    { id: '1', name: 'Laptop', price: 1000, stock: 5 },
    { id: '2', name: 'Mouse', price: 25, stock: 50 },
    { id: '3', name: 'Keyboard', price: 75, stock: 20 }
  ];

  private orders: Order[] = [];

  createOrder(items: Array<{ productId: string; quantity: number }>): Order {
    const orderItems: OrderItem[] = [];
    let subtotal = 0;

    for (const item of items) {
      const product = this.products.find(p => p.id === item.productId);
      if (!product) {
        throw new AppError(404, `Product not found: ${item.productId}`);
      }

      // FIX 1
      if (product.stock < item.quantity) {
        throw new AppError(
          400,
          `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
        );
      }

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      });

      subtotal += product.price * item.quantity;
    }

    for (const item of items) {
      const product = this.products.find(p => p.id === item.productId)!;
      product.stock -= item.quantity;
    }

    // FIX 2
    const tax = subtotal * config.taxRate;
    const total = subtotal + tax;

    const now = new Date().toISOString();
    const order: Order = {
      id: uuidv4(),
      items: orderItems,
      subtotal,
      tax,
      total,
      status: 'Pending',
      createdAt: now,
      updatedAt: now
    };

    this.orders.push(order);
    return order;
  }

  // FIX 3
  getOrderById(orderId: string): Order | null {
    return this.orders.find(o => o.id === orderId) || null;
  }

  // FIX 4
  getOrders(status?: string): Order[] {
    if (status) {
      return this.orders.filter(o => o.status === status);
    }
    return this.orders;
  }

  updateOrderStatus(orderId: string, newStatus: string): Order {
    const order = this.getOrderById(orderId);
    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    const now = new Date().toISOString();
    order.status = newStatus as Order['status'];
    order.updatedAt = now;
    return order;
  }
}