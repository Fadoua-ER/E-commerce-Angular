import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { ProductCardComponent } from '../../../shared/product-card/product-card';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-category-products',
  imports: [CommonModule, ProductCardComponent, SpinnerComponent],
  template: `
    <div class="category-products">
      <h2>Products in Category</h2>
      <div class="products">
        <app-product-card *ngFor="let product of products" [product]="product"></app-product-card>
      </div>
      <app-spinner *ngIf="loading"></app-spinner>
    </div>
  `,
  styles: [`
    .category-products {
      padding: 20px;
    }
    .products {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `]
})
export class CategoryProductsComponent implements OnInit {
  products: Product[] = [];
  loading = false;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loading = true;
    this.productService.getProducts().subscribe(products => {
      this.products = products.filter(p => p.categoryId === id);
      this.loading = false;
    });
  }
}
