import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { ToastNotificationComponent } from '../../../shared/toast-notification/toast-notification';
import { Product } from '../../../models/product';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, FormsModule, SpinnerComponent, ToastNotificationComponent],
  template: `
    <div class="app-container">
      <div class="card">
        <h2 class="text-center">{{ isEdit ? 'Edit Product' : 'Add Product' }}</h2>
        <form (ngSubmit)="saveProduct()">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" [(ngModel)]="product.name" name="name" id="name" class="form-input" required />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea [(ngModel)]="product.description" name="description" id="description" class="form-input" required></textarea>
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input type="number" [(ngModel)]="product.price" name="price" id="price" class="form-input" required />
          </div>
          <div class="form-group">
            <label for="categoryId">Category</label>
            <select [(ngModel)]="product.categoryId" name="categoryId" id="categoryId" class="form-input" required>
              <option *ngFor="let category of categories" [value]="category.id">{{ category.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="imageUrl">Image URL</label>
            <input type="text" [(ngModel)]="product.imageUrl" name="imageUrl" id="imageUrl" class="form-input" required />
          </div>
          <div class="form-group">
            <label for="stock">Stock</label>
            <input type="number" [(ngModel)]="product.stock" name="stock" id="stock" class="form-input" required />
          </div>
          <button type="submit" class="btn" [disabled]="loading">{{ isEdit ? 'Update Product' : 'Add Product' }}</button>
        </form>
        <app-spinner *ngIf="loading"></app-spinner>
        <app-toast-notification [message]="toastMessage" [type]="toastType" [show]="showToast"></app-toast-notification>
      </div>
    </div>
  `,
  styles: [`
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    textarea {
      resize: vertical;
      min-height: 80px;
    }
  `]
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
    imageUrl: '',
    stock: 0,
    rating: 0,
    reviewsCount: 0
  };
  categories: Category[] = [];
  isEdit = false;
  loading = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.queryParams['id'];
    if (id) {
      this.isEdit = true;
      this.productService.getProductById(+id).subscribe(product => {
        if (product) this.product = product;
      });
    }
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  saveProduct() {
    this.loading = true;
    if (this.isEdit) {
      this.productService.updateProduct(this.product);
    } else {
      this.product.id = Date.now();
      this.productService.addProduct(this.product);
    }
    this.loading = false;
    this.showToastMessage('Product saved', 'success');
    this.router.navigate(['/admin/products']);
  }

  private showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }
}
