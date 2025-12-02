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
  previousCategoryId = signal<number>(1);
  currentCategoryId = signal<number>(1);
  searchMode = signal<boolean>(false);
  pageNumber = signal<number>(1);
  pageSize = signal<number>(10);
  totalElements = signal<number>(0);
  previousKeyword = signal<string>('');

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode.set(this.route.snapshot.paramMap.has('keyword'));

    if (this.searchMode()) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyword = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword() !== keyword) {
      this.pageNumber.set(1);
    }

    this.previousKeyword.set(keyword);

    this.productService
      .searchProductsPaginate(this.pageNumber() - 1, this.pageSize(), keyword)
      .subscribe(this.processResult());
  }

  handleListProducts() {
    const hasCategoryId = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId.set(+this.route.snapshot.paramMap.get('id')!);
    } else {
      this.currentCategoryId.set(1);
    }

    if (this.previousCategoryId() !== this.currentCategoryId()) {
      this.pageNumber.set(1);
    }

    this.previousCategoryId.set(this.currentCategoryId());

    this.productService
      .getProductListPaginate(
        this.pageNumber() - 1,
        this.pageSize(),
        this.currentCategoryId(),
      )
      .subscribe(this.processResult());
  }

  updatePageSize(pageSize: string) {
    this.pageSize.set(+pageSize);
    this.pageNumber.set(1);
    this.listProducts();
  }

  processResult() {
    return (data: any) => {
      this.products.set(data._embedded.products);
      this.pageNumber.set(data.page.number + 1);
      this.pageSize.set(data.page.size);
      this.totalElements.set(data.page.totalElements);
    };
  }
}
