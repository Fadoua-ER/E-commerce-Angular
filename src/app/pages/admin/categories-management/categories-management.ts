import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { CategoryCardComponent } from '../../../shared/category-card/category-card';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-categories-management',
  imports: [CommonModule, CategoryCardComponent, SpinnerComponent, ConfirmDialogComponent],
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
            <span class="material-icons">category</span>
            Categories Management
          </h1>
          <p>Manage product categories</p>
          <button class="btn-primary" (click)="addCategory()">
            <span class="material-icons">add</span>
            Add Category
          </button>
        </div>

        <div class="content-grid">
          <div *ngFor="let category of categories" class="category-card-admin">
            <div class="category-info">
              <h3>{{ category.name }}</h3>
              <p>{{ category.description }}</p>
            </div>
            <div class="category-actions">
              <button class="btn-primary" (click)="editCategory(category)">
                <span class="material-icons">edit</span>
                Edit
              </button>
              <button class="btn-danger" (click)="deleteCategory(category.id)">
                <span class="material-icons">delete</span>
                Delete
              </button>
            </div>
          </div>
        </div>

        <app-spinner *ngIf="loading"></app-spinner>
        <app-confirm-dialog [show]="showConfirm" [message]="'Are you sure you want to delete this category?'" (confirmed)="confirmDelete($event)"></app-confirm-dialog>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      padding-bottom: 16px;
      border-bottom: 1px solid #404040;
    }
    .page-header h1 {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 2rem;
      margin: 0;
      color: #667eea;
    }
    .page-header p {
      color: #b0b0b0;
      margin: 8px 0 0 0;
      font-size: 0.9rem;
    }
    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 20px;
    }
    .category-card-admin {
      background: #2d2d2d;
      border-radius: 12px;
      padding: 24px;
      border: 1px solid #404040;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s ease;
    }
    .category-card-admin:hover {
      background: #353535;
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
    .category-info h3 {
      color: #667eea;
      margin: 0 0 8px 0;
      font-size: 1.2rem;
    }
    .category-info p {
      color: #b0b0b0;
      margin: 0;
      font-size: 0.9rem;
    }
    .category-actions {
      display: flex;
      gap: 8px;
    }
    .btn-primary,
    .btn-danger {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-primary {
      background: #667eea;
      color: white;
      border: none;
    }
    .btn-primary:hover {
      background: #5a67d8;
      transform: translateY(-1px);
    }
    .btn-danger {
      background: #e53e3e;
      color: white;
      border: none;
    }
    .btn-danger:hover {
      background: #c53030;
      transform: translateY(-1px);
    }
    @media (max-width: 768px) {
      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      .content-grid {
        grid-template-columns: 1fr;
      }
      .category-card-admin {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      .category-actions {
        width: 100%;
        justify-content: flex-end;
      }
    }
  `]
})
export class CategoriesManagementComponent implements OnInit {
  categories: Category[] = [];
  loading = false;
  showConfirm = false;
  categoryToDelete: number | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.loading = false;
    });
  }

  addCategory() {
    // Open modal or navigate to form
  }

  editCategory(category: Category) {
    // Open modal or navigate
  }

  deleteCategory(id: number) {
    this.categoryToDelete = id;
    this.showConfirm = true;
  }

  confirmDelete(confirmed: boolean) {
    if (confirmed && this.categoryToDelete) {
      this.categoryService.deleteCategory(this.categoryToDelete);
      this.loadCategories();
    }
    this.showConfirm = false;
    this.categoryToDelete = null;
  }
}
