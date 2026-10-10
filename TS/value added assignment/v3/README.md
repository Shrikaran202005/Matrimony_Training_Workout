# Smart Inventory Management System

## Project Overview
This project is a retail inventory platform for RetailHub managing Products, Suppliers, and Warehouses. This assignment focuses on refactoring the system's architecture to eliminate redundant repository classes and improve code reusability using TypeScript Generics.

## Duplication Identified
The initial architecture contained three separate repository classes (`ProductRepository`, `SupplierRepository`, `WarehouseRepository`) that performed the exact same collection management and CRUD operations, differing only in the TypeScript interface they accepted.

## Generic Design Approach
To resolve maintainability issues, a `BaseEntity` interface was created to guarantee that all entities possess an `id` property. A single `GenericRepository<T extends BaseEntity>` was then implemented to handle adding, fetching, searching, and deleting data for any conforming interface safely.

## Refactoring Steps
1. Created the `BaseEntity` interface with `id: number`.
2. Ensured `Product`, `Supplier`, and `Warehouse` extended `BaseEntity`.
3. Created `GenericRepository<T>` with `add`, `getAll`, `getById`, and `deleteById` methods.
4. Replaced the three old concrete repositories with instantiations of the Generic class.
5. Loaded initial dataset arrays into their respective generic repositories via `.forEach()`.

## How To Execute
1. Open the terminal in the project directory.
2. Compile the code: `tsc smart-inventory-system.ts`
3. Run the compiled JavaScript: `node smart-inventory-system.js`

## Sample Output
--- Verification Requirement 1: Product Search ---
{ id: 101, name: 'Laptop', price: 50000 }

--- Verification Requirement 3: Supplier Search ---
{ id: 2, supplierName: 'Global Electronics' }

--- Verification Requirement 2: Warehouse Delete ---
Remaining Warehouses:
[ { id: 12, location: 'Bangalore' } ]