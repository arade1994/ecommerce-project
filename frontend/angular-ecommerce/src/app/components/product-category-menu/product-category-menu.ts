import { Component, signal } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-category-menu',
  standalone: false,
  templateUrl: './product-category-menu.html',
  styleUrl: './product-category-menu.css',
})
export class ProductCategoryMenu {
  productCategories = signal<ProductCategory[]>([]);

  constructor(private productService: ProductService) {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe((data) => {
      this.productCategories.set(data);
    });
  }
}
