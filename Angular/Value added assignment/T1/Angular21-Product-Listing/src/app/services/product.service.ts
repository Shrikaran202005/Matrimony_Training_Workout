import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  
  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 999, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80', category: 'Electronics', stock: 5 },
    { id: 2, name: 'Phone', price: 699, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80', category: 'Electronics', stock: 0 },
    { id: 3, name: 'Desk', price: 299, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=500&q=80', category: 'Furniture', stock: 10 },
    { id: 4, name: 'Chair', price: 199, image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=500&q=80', category: 'Furniture', stock: 3 }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  products$ = this.productsSubject.asObservable();

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getCategories(): string[] {
    return [...new Set(this.products.map(p => p.category))];
  }

  getTotalCount(): number {
    return this.products.length;
  }

  getCategoryCount(category: string): number {
    return this.products.filter(p => p.category === category).length;
  }

  filterByCategory(category: string): Observable<Product[]> {
    // FIX applied: Use 'of' from 'rxjs' to return an observable of the filtered array
    const filtered = this.products.filter(p => p.category === category);
    return of(filtered);
  }
}
