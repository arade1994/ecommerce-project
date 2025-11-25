import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);

  constructor() {
    this.listProducts();
  }

  listProducts() {
    this.productService.getProductList().subscribe((data) => {
      this.products.set(data);
    });
  }
}
