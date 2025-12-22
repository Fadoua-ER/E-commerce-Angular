import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  template: `
    <header class="header user-theme">
      <div class="container">
        <div class="logo">
          <a routerLink="/user/home">
            <span class="material-icons">shopping_bag</span>
            E-Commerce
          </a>
        </div>
        <nav class="nav">
          <a routerLink="/user/home" *ngIf="!isAdmin" class="nav-link">
            <span class="material-icons">home</span>
            Home
          </a>
          <a routerLink="/user/cart" *ngIf="isUser" class="nav-link cart-link">
            <span class="material-icons">shopping_cart</span>
            Cart
            <span class="badge" *ngIf="cartCount > 0">{{ cartCount }}</span>
          </a>
          <a routerLink="/user/wishlist" *ngIf="isUser" class="nav-link">
            <span class="material-icons">favorite</span>
            Wishlist
            <span class="badge" *ngIf="wishlistCount > 0">{{ wishlistCount }}</span>
          </a>
          <a routerLink="/user/profile" *ngIf="isAuthenticated" class="nav-link">
            <span class="material-icons">person</span>
            Profile
          </a>
          <a routerLink="/user/order-history" *ngIf="isAuthenticated && !isAdmin" class="nav-link">
            <span class="material-icons">receipt</span>
            Orders
          </a>
          <div class="admin-nav" *ngIf="isAdmin">
            <a routerLink="/admin/dashboard" class="nav-link">
              <span class="material-icons">dashboard</span>
              Dashboard
            </a>
            <a routerLink="/admin/products" class="nav-link">
              <span class="material-icons">inventory</span>
              Products
            </a>
            <a routerLink="/admin/orders" class="nav-link">
              <span class="material-icons">shopping_bag</span>
              Orders
            </a>
            <a routerLink="/admin/users" class="nav-link">
              <span class="material-icons">people</span>
              Users
            </a>
          </div>
          <button (click)="logout()" *ngIf="isAuthenticated" class="btn-secondary">
            <span class="material-icons">logout</span>
            Logout
          </button>
          <a routerLink="/login" *ngIf="!isAuthenticated" class="btn-primary">
            <span class="material-icons">login</span>
            Login
          </a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
    }
    .logo a {
      color: white;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.3s ease;
    }
    .logo a:hover {
      transform: scale(1.05);
    }
    .logo .material-icons {
      font-size: 32px;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .nav-link {
      color: white;
      text-decoration: none;
      padding: 10px 16px;
      border-radius: 8px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 500;
      position: relative;
    }
    .nav-link:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }
    .nav-link .material-icons {
      font-size: 20px;
    }
    .cart-link .badge,
    .nav-link .badge {
      background: #ff6b6b;
      color: white;
      border-radius: 50%;
      padding: 2px 6px;
      font-size: 12px;
      font-weight: bold;
      min-width: 18px;
      text-align: center;
      position: absolute;
      top: -8px;
      right: -8px;
    }
    .admin-nav {
      display: flex;
      gap: 12px;
      margin-right: 16px;
      padding-right: 16px;
      border-right: 1px solid rgba(255, 255, 255, 0.2);
    }
    .btn-primary,
    .btn-secondary {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    .btn-primary {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 10px 20px;
      border-radius: 8px;
    }
    .btn-primary:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }
    .btn-secondary {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.5);
      padding: 10px 20px;
      border-radius: 8px;
      color: white;
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: white;
    }
    @media (max-width: 1024px) {
      .admin-nav {
        display: none;
      }
    }
    @media (max-width: 768px) {
      .container {
        flex-direction: column;
        gap: 16px;
        padding: 0 16px;
      }
      .nav {
        flex-wrap: wrap;
        justify-content: center;
        gap: 8px;
      }
      .nav-link {
        padding: 8px 12px;
        font-size: 14px;
      }
      .logo {
        font-size: 24px;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  isAdmin = false;
  isUser = false;
  cartCount = 0;
  wishlistCount = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.isAdmin = user?.role === 'ADMIN';
      this.isUser = user?.role === 'USER';
    });
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    });
    this.wishlistService.wishlist$.subscribe(wishlist => {
      this.wishlistCount = wishlist.length;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
