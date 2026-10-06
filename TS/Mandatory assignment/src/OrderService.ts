import { Order } from './Order';
import { Product } from './Product';

export class OrderService {
    private currentOrderId: number = 1;

    private validateProduct(product: Product): void {
        const alphabetsOnlyRegex = /^[A-Za-z\s]+$/;
        if (!alphabetsOnlyRegex.test(product.name)) {
            throw new Error(`Validation Error: Product name '${product.name}' must contain only alphabets.`);
        }
        if (product.price <= 0) {
            throw new Error(`Validation Error: Product price for '${product.name}' must be greater than 0.`);
        }
    }

    createOrder(products: Product[]): Order {
        products.forEach(this.validateProduct);
        const order: Order = {
            id: this.currentOrderId++,
            products: products
        };
        return order;
    }

    calculateTotal(order: Order): number {
        return order.products.reduce((total, product) => total + product.price, 0);
    }

    applyDiscount(order: Order, discount?: number): number {
        const total = this.calculateTotal(order);
        if (discount === undefined) {
            return total;
        }
        if (discount > 100 || discount < 0) {
            throw new Error("Validation Error: Discount cannot exceed 100 or be less than 0.");
        }
        const discountAmount = total * (discount / 100);
        return total - discountAmount;
    }
}