interface BaseEntity {
    id: number;
}

interface Product extends BaseEntity {
    name: string;
    price: number;
}

interface Supplier extends BaseEntity {
    supplierName: string;
}

interface Warehouse extends BaseEntity {
    location: string;
}

// Datasets
const products: Product[] = [
    { id: 101, name: "Laptop", price: 50000 },
    { id: 102, name: "Mouse", price: 1000 }
];

const suppliers: Supplier[] = [
    { id: 1, supplierName: "Tech Distributors" },
    { id: 2, supplierName: "Global Electronics" }
];

const warehouses: Warehouse[] = [
    { id: 11, location: "Chennai" },
    { id: 12, location: "Bangalore" }
];

// 3. Generic Repository Implementation
class GenericRepository<T extends BaseEntity> {
    private items: T[] = [];

    add(entity: T): void {
        this.items.push(entity);
    }

    getAll(): T[] {
        return this.items;
    }

    getById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }

    deleteById(id: number): void {
        this.items = this.items.filter(item => item.id !== id);
    }
}

// 4. Repository Creation & Data Loading
const productRepository = new GenericRepository<Product>();
products.forEach(p => productRepository.add(p));

const supplierRepository = new GenericRepository<Supplier>();
suppliers.forEach(s => supplierRepository.add(s));

const warehouseRepository = new GenericRepository<Warehouse>();
warehouses.forEach(w => warehouseRepository.add(w));

// 5. Verification Requirements
console.log("--- Verification Requirement 1: Product Search ---");
console.log(productRepository.getById(101));

console.log("\n--- Verification Requirement 3: Supplier Search ---");
console.log(supplierRepository.getById(2));

console.log("\n--- Verification Requirement 2: Warehouse Delete ---");
warehouseRepository.deleteById(11);
console.log("Remaining Warehouses:");
console.log(warehouseRepository.getAll());

// Type Safety Validation
// productRepository.add({
//     supplierName: "ABC"
// });