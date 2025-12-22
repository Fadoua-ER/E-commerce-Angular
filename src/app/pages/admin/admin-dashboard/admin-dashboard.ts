import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterLink, RouterLinkActive, SpinnerComponent],
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
        <div class="dashboard-header">
          <h1>
            <span class="material-icons">dashboard</span>
            Admin Dashboard
          </h1>
          <p>Overview of your e-commerce platform</p>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <span class="material-icons">inventory</span>
            </div>
            <div class="stat-content">
              <h3>{{ productsCount }}</h3>
              <p>Total Products</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <span class="material-icons">shopping_bag</span>
            </div>
            <div class="stat-content">
              <h3>{{ ordersCount }}</h3>
              <p>Total Orders</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <span class="material-icons">people</span>
            </div>
            <div class="stat-content">
              <h3>{{ usersCount }}</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <span class="material-icons">attach_money</span>
            </div>
            <div class="stat-content">
              <h3>{{ revenue | currency }}</h3>
              <p>Total Revenue</p>
            </div>
          </div>
        </div>

        <div class="quick-actions">
          <h2>Quick Actions</h2>
          <div class="grid-3">
            <a routerLink="/admin/products" class="action-card">
              <span class="material-icons">add</span>
              <h4>Add Product</h4>
              <p>Create new product listings</p>
            </a>
            <a routerLink="/admin/categories" class="action-card">
              <span class="material-icons">create_new_folder</span>
              <h4>Manage Categories</h4>
              <p>Organize product categories</p>
            </a>
            <a routerLink="/admin/orders" class="action-card">
              <span class="material-icons">assignment</span>
              <h4>View Orders</h4>
              <p>Process customer orders</p>
            </a>
          </div>
        </div>

        <app-spinner *ngIf="loading"></app-spinner>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-header {
      margin-bottom: 32px;
    }
    .dashboard-header h1 {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 2.5rem;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 8px;
    }
    .dashboard-header p {
      color: #b0b0b0;
      font-size: 1.1rem;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }
    .stat-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 24px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
      transition: transform 0.3s ease;
    }
    .stat-card:hover {
      transform: translateY(-4px);
    }
    .stat-icon {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .stat-icon .material-icons {
      font-size: 28px;
      color: white;
    }
    .stat-content h3 {
      font-size: 2rem;
      font-weight: bold;
      margin: 0 0 4px 0;
    }
    .stat-content p {
      margin: 0;
      opacity: 0.9;
      font-size: 0.9rem;
    }
    .quick-actions h2 {
      color: #667eea;
      font-size: 1.8rem;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .action-card {
      background: #2d2d2d;
      border: 1px solid #404040;
      border-radius: 8px;
      padding: 20px;
      text-decoration: none;
      color: #e0e0e0;
      transition: all 0.3s ease;
      text-align: center;
    }
    .action-card:hover {
      background: #404040;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    .action-card .material-icons {
      font-size: 32px;
      color: #667eea;
      margin-bottom: 12px;
    }
    .action-card h4 {
      margin: 0 0 8px 0;
      font-size: 1.1rem;
    }
    .action-card p {
      margin: 0;
      font-size: 0.9rem;
      color: #b0b0b0;
    }
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      .dashboard-header h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  productsCount = 0;
  ordersCount = 0;
  usersCount = 0;
  revenue = 0;
  loading = false;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.productService.getProducts().subscribe(products => {
      this.productsCount = products.length;
    });
    this.orderService.getAllOrders().subscribe(orders => {
      this.ordersCount = orders.length;
      this.revenue = orders.reduce((sum, order) => sum + order.total, 0);
    });
    this.userService.getUsers().subscribe(users => {
      this.usersCount = users.length;
    });
    this.loading = false;
  }
}
