import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-orders-management',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, SpinnerComponent],
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
            <span class="material-icons">shopping_bag</span>
            Orders Management
          </h1>
          <p>Manage customer orders and fulfillment</p>
        </div>

        <div class="filters-section">
          <div class="search-box">
            <span class="material-icons">search</span>
            <input type="text" placeholder="Search orders..." [(ngModel)]="searchTerm" (input)="filterOrders()">
          </div>
          <select class="filter-select" [(ngModel)]="selectedStatus" (change)="filterOrders()">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div class="orders-grid">
          <div *ngFor="let order of filteredOrders" class="order-card-admin">
            <div class="order-header">
              <div class="order-id">
                <span class="material-icons">receipt</span>
                Order #{{ order.id }}
              </div>
              <div class="order-date">{{ order.createdAt | date:'short' }}</div>
            </div>
            <div class="order-info">
              <div class="customer-info">
                <span class="material-icons">person</span>
                User ID: {{ order.userId }}
              </div>
              <div class="order-total">
                <span class="material-icons">attach_money</span>
                {{ order.total }}
              </div>
            </div>
            <div class="order-status">
              <select [(ngModel)]="order.status" (change)="updateStatus(order)" class="status-select">
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div class="order-actions">
              <button class="btn-primary" (click)="viewOrderDetails(order)">
                <span class="material-icons">visibility</span>
                View Details
              </button>
            </div>
          </div>
        </div>

        <app-spinner *ngIf="loading"></app-spinner>
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
      height: 100vh;
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
      min-width: 150px;
    }

    .orders-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 20px;
    }

    .order-card-admin {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 20px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .order-card-admin:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ecf0f1;
    }

    .order-id {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: bold;
      color: #2c3e50;
    }

    .order-date {
      color: #7f8c8d;
      font-size: 0.9rem;
    }

    .order-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }

    .customer-info, .order-total {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #34495e;
    }

    .order-total {
      font-weight: bold;
      font-size: 1.1rem;
      color: #27ae60;
    }

    .order-status {
      margin-bottom: 15px;
    }

    .status-select {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      background: white;
      font-size: 0.9rem;
    }

    .order-actions {
      display: flex;
      justify-content: flex-end;
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

      .orders-grid {
        grid-template-columns: 1fr;
      }

      .order-info {
        flex-direction: column;
        gap: 10px;
      }
    }
  `]
})
export class OrdersManagementComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  loading = false;
  searchTerm = '';
  selectedStatus = '';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loading = true;
    this.orderService.getAllOrders().subscribe(orders => {
      this.orders = orders;
      this.filteredOrders = orders;
      this.loading = false;
    });
  }

  filterOrders() {
    this.filteredOrders = this.orders.filter(order => {
      const matchesSearch = order.id.toString().includes(this.searchTerm) ||
                           order.userId.toString().includes(this.searchTerm);
      const matchesStatus = !this.selectedStatus || order.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  updateStatus(order: Order) {
    this.orderService.updateOrderStatus(order.id, order.status);
  }

  viewOrderDetails(order: Order) {
    // TODO: Implement view order details functionality
    console.log('View order details:', order);
  }
}
