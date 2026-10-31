import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  
  private cartCount = 0;
  private cartSubject = new BehaviorSubject<number>(this.cartCount);
  cartCount$ = this.cartSubject.asObservable();

  addToCart(product: Product): void {
    this.cartCount++;
    this.cartSubject.next(this.cartCount);
  }

  getCartCount(): number {
    return this.cartCount;
  }
}