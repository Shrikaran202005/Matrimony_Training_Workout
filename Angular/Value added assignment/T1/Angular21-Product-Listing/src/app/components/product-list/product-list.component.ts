import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  totalCount: number = 0;
  cartCount$!: Observable<number>; 

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.categories = this.productService.getCategories();
    this.loadProducts();
    
    // FIX applied: cartCount$ is now initialized
    this.cartCount$ = this.cartService.cartCount$;
  }

  loadProducts(): void {
    if (this.selectedCategory === '') {
      this.productService.getProducts().subscribe(data => {
        this.products = data;
        this.totalCount = data.length;
      });
    } else {
      this.productService.filterByCategory(this.selectedCategory).subscribe(data => {
        this.products = data;
        this.totalCount = data.length;
      });
    }
  }

  onCategoryChange(): void {
    this.loadProducts();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    
    // FIX applied: User feedback provided
    alert(`${product.name} has been added to your cart!`);
  }
}