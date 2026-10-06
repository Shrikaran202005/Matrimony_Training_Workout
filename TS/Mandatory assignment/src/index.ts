import { Product } from './Product';
import { OrderService } from './OrderService';
import { filterExpensiveProducts } from './utils';

const products: Product[] = [
    { id: 101, name: "Laptop", price: 1200 },
    { id: 102, name: "Mouse", price: 25 },
    { id: 103, name: "Keyboard", price: 75 },
    { id: 104, name: "Monitor", price: 300 }
];

const orderService = new OrderService();
try {
    const myOrder = orderService.createOrder(products);
    console.log("--- New Order Created ---");
    console.log(myOrder);

    const total = orderService.calculateTotal(myOrder);
    console.log(`\nOriginal Total: $${total}`);

    const totalWithDiscount = orderService.applyDiscount(myOrder, 15); // 15% 
    console.log(`Total after 15% discount: $${totalWithDiscount}`);

    const totalWithoutDiscountParameter = orderService.applyDiscount(myOrder);
    console.log(`Total with no discount parameter passed: $${totalWithoutDiscountParameter}`);

    const minPriceThreshold = 100;
    const expensiveItems = filterExpensiveProducts(products, minPriceThreshold);
    
    console.log(`\n--- Expensive Products (>= $${minPriceThreshold}) ---`);
    console.log(expensiveItems);

} catch (error: any) {
    console.error(error.message);
}