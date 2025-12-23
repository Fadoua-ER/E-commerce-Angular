import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { ProductCardComponent } from '../../../shared/product-card/product-card';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog';
import { Product } from '../../../models/product';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-products-management',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, ProductCardComponent, SpinnerComponent, ConfirmDialogComponent],
  template: `
    <div class="admin-theme">
      <div class="sidebar">
        <div class="logo">
          <span class="material-icons">admin_panel_settings</span>
          Admin Panel
        </div>
        <nav>
          <a routerLink="/admin/dashboard" routerLinkActive="active" class="nav-link">
            <span class="material-icons">dashboard</span>
            Dashboard
          </a>
          <a routerLink="/admin/products" routerLinkActive="active" class="nav-link">
            <span class="material-icons">inventory</span>
            Products
          </a>
          <a routerLink="/admin/categories" routerLinkActive="active" class="nav-link">
            <span class="material-icons">category</span>
            Categories
          </a>
          <a routerLink="/admin/orders" routerLinkActive="active" class="nav-link">
            <span class="material-icons">shopping_bag</span>
            Orders
          </a>
          <a routerLink="/admin/users" routerLinkActive="active" class="nav-link">
            <span class="material-icons">people</span>
            Users
          </a>
          <a routerLink="/admin/reviews" routerLinkActive="active" class="nav-link">
            <span class="material-icons">rate_review</span>
            Reviews
          </a>
          <a routerLink="/admin/analytics" routerLinkActive="active" class="nav-link">
            <span class="material-icons">analytics</span>
            Analytics
          </a>
        </nav>
      </div>

      <div class="main-content">
        <div class="page-header">
          <h1>
            <span class="material-icons">inventory</span>
            Products Management
          </h1>
          <p>Manage your product catalog</p>
          <button class="btn-primary" (click)="addProduct()">
            <span class="material-icons">add</span>
            Add Product
          </button>
        </div>

        <div class="filters-section">
          <div class="search-box">
            <span class="material-icons">search</span>
            <input type="text" placeholder="Search products..." [(ngModel)]="searchTerm" (input)="filterProducts()">
          </div>
          <select class="filter-select" [(ngModel)]="selectedCategory" (change)="filterProducts()">
            <option value="">All Categories</option>
            <option *ngFor="let category of categories" [value]="category.id">{{ category.name }}</option>
          </select>
        </div>

        <div class="products-grid">
          <div *ngFor="let product of filteredProducts" class="product-card-admin">
            <div class="product-image">
              <img [src]="product.imageUrl" [alt]="product.name" />
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="price">{{ product.price }}</p>
              <p class="stock">Stock: {{ product.stock }}</p>
              <div class="rating">
                <span class="material-icons star" *ngFor="let star of getStars(product.rating)">star</span>
                <span class="rating-text">{{ product.rating }}/5 ({{ product.reviewsCount }} reviews)</span>
              </div>
            </div>
            <div class="product-actions">
              <button class="btn-primary" (click)="editProduct(product)">
                <span class="material-icons">edit</span>
                Edit
              </button>
              <button class="btn-danger" (click)="deleteProduct(product.id)">
                <span class="material-icons">delete</span>
                Delete
              </button>
            </div>
          </div>
        </div>

        <app-spinner *ngIf="loading"></app-spinner>
        <app-confirm-dialog [show]="showConfirm" [message]="'Are you sure you want to delete this product?'" (confirmed)="confirmDelete($event)"></app-confirm-dialog>
      </div>
    </div>
  `,
  styles: [`
    .admin-theme {
      display: flex;
      min-height: 100vh;
      background: #f5f5f5;
    }

    .sidebar {
      width: 250px;
      background: #2c3e50;
      color: white;
      padding: 20px 0;
      position: fixed;
      top: var(--header-height, 72px);
      bottom: var(--footer-height, 80px);
      overflow-y: auto;
    }

    .logo {
      padding: 0 20px 30px;
      border-bottom: 1px solid #34495e;
      font-size: 1.2rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .logo .material-icons {
      font-size: 1.5rem;
    }

    nav {
      padding: 20px 0;
    }

    .nav-link {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      color: #bdc3c7;
      text-decoration: none;
      transition: all 0.3s ease;
      gap: 10px;
    }

    .nav-link:hover {
      background: #34495e;
      color: white;
    }

    .nav-link.active {
      background: #3498db;
      color: white;
      border-right: 3px solid #2980b9;
    }

    .main-content {
      flex: 1;
      margin-left: 250px;
      padding: 30px;
      min-height: calc(100vh - var(--header-height, 72px) - var(--footer-height, 80px));
    }

    .page-header {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .page-header h1 {
      margin: 0;
      color: #2c3e50;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 2rem;
    }

    .page-header p {
      margin: 5px 0 0 0;
      color: #7f8c8d;
    }

    .btn-primary {
      background: #3498db;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      transition: background 0.3s ease;
    }

    .btn-primary:hover {
      background: #2980b9;
    }

    .btn-danger {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.8rem;
      transition: background 0.3s ease;
    }

    .btn-danger:hover {
      background: #c0392b;
    }

    .filters-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin-bottom: 30px;
      display: flex;
      gap: 20px;
      align-items: center;
    }

    .search-box {
      display: flex;
      align-items: center;
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      padding: 10px 15px;
      flex: 1;
      gap: 10px;
    }

    .search-box input {
      border: none;
      background: transparent;
      flex: 1;
      outline: none;
      font-size: 0.9rem;
    }

    .filter-select {
      padding: 10px 15px;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      background: white;
      font-size: 0.9rem;
      min-width: 200px;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
    }

    .product-card-admin {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .product-card-admin:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }

    .product-image {
      height: 200px;
      overflow: hidden;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .product-info {
      padding: 20px;
    }

    .product-info h3 {
      margin: 0 0 10px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    .price {
      font-size: 1.2rem;
      font-weight: bold;
      color: #27ae60;
      margin: 0 0 5px 0;
    }

    .stock {
      color: #7f8c8d;
      margin: 0 0 10px 0;
      font-size: 0.9rem;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 15px;
    }

    .star {
      color: #f39c12;
      font-size: 1rem;
    }

    .rating-text {
      color: #7f8c8d;
      font-size: 0.8rem;
    }

    .product-actions {
      padding: 0 20px 20px;
      display: flex;
      gap: 10px;
    }

    .product-actions .btn-primary {
      flex: 1;
      justify-content: center;
    }

    .product-actions .btn-danger {
      flex: 1;
      justify-content: center;
    }

    @media (max-width: 768px) {
      .sidebar {
        width: 100%;
        height: auto;
        position: relative;
      }

      .main-content {
        margin-left: 0;
      }

      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }

      .filters-section {
        flex-direction: column;
        align-items: stretch;
      }

      .products-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProductsManagementComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  loading = false;
  showConfirm = false;
  productToDelete: number | null = null;
  searchTerm = '';
  selectedCategory = '';

  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
      this.loading = false;
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  addProduct() {
    this.router.navigate(['/admin/product-form']);
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || product.categoryId.toString() === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  editProduct(product: Product) {
    this.router.navigate(['/admin/product-form'], { queryParams: { id: product.id } });
  }

  deleteProduct(id: number) {
    this.productToDelete = id;
    this.showConfirm = true;
  }

  confirmDelete(confirmed: boolean) {
    if (confirmed && this.productToDelete) {
      this.productService.deleteProduct(this.productToDelete);
      this.loadProducts();
    }
    this.showConfirm = false;
    this.productToDelete = null;
  }
}
