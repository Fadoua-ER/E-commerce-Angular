import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog';
import { User } from '../../../models/user';

@Component({
  selector: 'app-users-management',
  imports: [CommonModule, FormsModule, SpinnerComponent, ConfirmDialogComponent],
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
            <span class="material-icons">people</span>
            Users Management
          </h1>
          <p>Manage user accounts and permissions</p>
        </div>

        <div class="filters-section">
          <div class="search-box">
            <span class="material-icons">search</span>
            <input type="text" placeholder="Search users..." [(ngModel)]="searchTerm" (input)="filterUsers()">
          </div>
          <select class="filter-select" [(ngModel)]="selectedRole" (change)="filterUsers()">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div class="users-grid">
          <div *ngFor="let user of filteredUsers" class="user-card-admin">
            <div class="user-avatar">
              <span class="material-icons">person</span>
            </div>
            <div class="user-info">
              <h3>{{ user.name }}</h3>
              <p class="email">{{ user.email }}</p>
              <span class="role-badge" [class.admin]="user.role === 'ADMIN'" [class.user]="user.role === 'USER'">
                {{ user.role | titlecase }}
              </span>
            </div>
            <div class="user-actions">
              <button class="btn-primary" (click)="editUser(user)">
                <span class="material-icons">edit</span>
                Edit
              </button>
              <button class="btn-danger" (click)="deleteUser(user.id)">
                <span class="material-icons">delete</span>
                Delete
              </button>
            </div>
          </div>
        </div>

        <app-spinner *ngIf="loading"></app-spinner>
        <app-confirm-dialog [show]="showConfirm" [message]="'Are you sure you want to delete this user?'" (confirmed)="confirmDelete($event)"></app-confirm-dialog>
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
      padding: 0px;
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
      min-width: 150px;
    }

    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
    }

    .user-card-admin {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 15px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .user-card-admin:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }

    .user-avatar {
      width: 60px;
      height: 60px;
      background: #3498db;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
    }

    .user-info {
      flex: 1;
    }

    .user-info h3 {
      margin: 0 0 5px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    .email {
      color: #7f8c8d;
      margin: 0 0 10px 0;
      font-size: 0.9rem;
    }

    .role-badge {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: bold;
      text-transform: uppercase;
    }

    .role-badge.admin {
      background: #e74c3c;
      color: white;
    }

    .role-badge.user {
      background: #27ae60;
      color: white;
    }

    .user-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .user-actions .btn-primary {
      padding: 8px 16px;
      font-size: 0.8rem;
    }

    .user-actions .btn-danger {
      padding: 6px 12px;
      font-size: 0.7rem;
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

      .users-grid {
        grid-template-columns: 1fr;
      }

      .user-card-admin {
        flex-direction: column;
        text-align: center;
      }

      .user-actions {
        flex-direction: row;
        justify-content: center;
      }
    }
  `]
})
export class UsersManagementComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  loading = false;
  showConfirm = false;
  userToDelete: number | null = null;
  searchTerm = '';
  selectedRole = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
      this.loading = false;
    });
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesRole = !this.selectedRole || user.role === this.selectedRole;
      return matchesSearch && matchesRole;
    });
  }

  editUser(user: User) {
    // TODO: Implement edit user functionality
    console.log('Edit user:', user);
  }

  deleteUser(id: number) {
    this.userToDelete = id;
    this.showConfirm = true;
  }

  confirmDelete(confirmed: boolean) {
    if (confirmed && this.userToDelete) {
      this.userService.deleteUser(this.userToDelete);
      this.loadUsers();
    }
    this.showConfirm = false;
    this.userToDelete = null;
  }
}
