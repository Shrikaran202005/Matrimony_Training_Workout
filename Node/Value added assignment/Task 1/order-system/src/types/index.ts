export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

export interface UpdateOrderStatusRequest {
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
}