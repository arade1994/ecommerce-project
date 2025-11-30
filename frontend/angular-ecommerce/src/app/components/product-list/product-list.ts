import { Component, signal } from '@angular/core';
import { ProductService } from '../../services/product';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products = signal<Product[]>([]);
  currentCategoryId = signal<number>(1);
  currentCategoryName = signal<string>('');

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    const hasCategoryId = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId.set(+this.route.snapshot.paramMap.get('id')!);
    } else {
      this.currentCategoryId.set(1);
    }

    this.productService
      .getProductList(this.currentCategoryId())
      .subscribe((data) => {
        this.products.set(data);
      });
  }
}
