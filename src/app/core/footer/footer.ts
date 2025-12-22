import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer user-theme" *ngIf="!isAdmin">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="brand">
              <span class="material-icons">shopping_bag</span>
              <h3>E-Commerce</h3>
            </div>
            <p>Your one-stop shop for amazing products at great prices.</p>
            <div class="social-links">
              <a href="#" class="social-link">
                <span class="material-icons">share</span>
              </a>
              <a href="#" class="social-link">
                <span class="material-icons">email</span>
              </a>
              <a href="#" class="social-link">
                <span class="material-icons">phone</span>
              </a>
            </div>
          </div>
          <div class="footer-section">
            <h4>
              <span class="material-icons">link</span>
              Quick Links
            </h4>
            <a routerLink="/user/home" *ngIf="isAuthenticated">
              <span class="material-icons">home</span>
              Home
            </a>
            <a routerLink="/user/search" *ngIf="isAuthenticated">
              <span class="material-icons">search</span>
              Search
            </a>
            <a routerLink="/user/cart" *ngIf="isAuthenticated">
              <span class="material-icons">shopping_cart</span>
              Cart
            </a>
            <a routerLink="/user/wishlist" *ngIf="isAuthenticated">
              <span class="material-icons">favorite</span>
              Wishlist
            </a>
            <a routerLink="/user/home" *ngIf="!isAuthenticated">
              <span class="material-icons">store</span>
              Shop
            </a>
            <a routerLink="/login" *ngIf="!isAuthenticated">
              <span class="material-icons">login</span>
              Login
            </a>
          </div>
          <div class="footer-section">
            <h4>
              <span class="material-icons">person</span>
              Account
            </h4>
            <a routerLink="/user/profile" *ngIf="isAuthenticated">
              <span class="material-icons">account_circle</span>
              Profile
            </a>
            <a routerLink="/user/order-history" *ngIf="isAuthenticated">
              <span class="material-icons">receipt</span>
              Orders
            </a>
            <button (click)="logout()" *ngIf="isAuthenticated" class="logout-btn">
              <span class="material-icons">logout</span>
              Logout
            </button>
          </div>
          <div class="footer-section">
            <h4>
              <span class="material-icons">contact_mail</span>
              Contact
            </h4>
            <p>
              <span class="material-icons">email</span>
              support@ecommerce.com
            </p>
            <p>
              <span class="material-icons">phone</span>
              +1 (555) 123-4567
            </p>
            <p>
              <span class="material-icons">location_on</span>
              123 Commerce St, City, State
            </p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 E-Commerce. All rights reserved.</p>
          <div class="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">FAQ</a>
          </div>
        </div>
      </div>
    </footer>

    <footer class="footer admin-theme" *ngIf="isAdmin">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="brand">
              <span class="material-icons">admin_panel_settings</span>
              <h3>E-Commerce Admin</h3>
            </div>
            <p>Management Panel - All rights reserved.</p>
          </div>
          <div class="footer-section">
            <h4>
              <span class="material-icons">link</span>
              Admin Links
            </h4>
            <a routerLink="/admin/dashboard">
              <span class="material-icons">dashboard</span>
              Dashboard
            </a>
            <a routerLink="/admin/products">
              <span class="material-icons">inventory</span>
              Products
            </a>
            <a routerLink="/admin/orders">
              <span class="material-icons">shopping_bag</span>
              Orders
            </a>
            <a routerLink="/admin/users">
              <span class="material-icons">people</span>
              Users
            </a>
          </div>
          <div class="footer-section">
            <h4>
              <span class="material-icons">security</span>
              System
            </h4>
            <p>Version 1.0.0</p>
            <p>Last updated: {{ currentDate | date }}</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 E-Commerce Admin Panel.</p>
          <button (click)="logout()" class="logout-btn">
            <span class="material-icons">logout</span>
            Logout
          </button>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      margin-top: auto;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    .footer.user-theme {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      color: #333;
      padding: 60px 0 30px;
    }
    .footer.admin-theme {
      background: #1a1a1a;
      color: #b0b0b0;
      padding: 40px 0 20px;
      border-top: 1px solid #404040;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
      margin-bottom: 40px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .brand .material-icons {
      font-size: 32px;
      color: #667eea;
    }
    .brand h3 {
      color: inherit;
      margin: 0;
      font-size: 1.5rem;
    }
    .footer-section h4 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      color: inherit;
      font-size: 1.1rem;
      font-weight: 600;
    }
    .footer-section h4 .material-icons {
      font-size: 18px;
      color: #667eea;
    }
    .footer-section a {
      display: flex;
      align-items: center;
      gap: 8px;
      color: inherit;
      text-decoration: none;
      margin-bottom: 12px;
      padding: 4px 0;
      transition: all 0.3s ease;
      opacity: 0.8;
    }
    .footer-section a:hover {
      opacity: 1;
      transform: translateX(4px);
    }
    .footer-section a .material-icons {
      font-size: 16px;
    }
    .social-links {
      display: flex;
      gap: 12px;
      margin-top: 16px;
    }
    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #667eea;
      color: white;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    .social-link:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
    .footer-section p {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      opacity: 0.8;
    }
    .footer-section p .material-icons {
      font-size: 16px;
      color: #667eea;
    }
    .logout-btn {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: inherit;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
    }
    .logout-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: white;
    }
    .footer-bottom {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      padding-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    .footer-bottom.admin-theme {
      border-top-color: #404040;
    }
    .footer-links {
      display: flex;
      gap: 20px;
    }
    .footer-links a {
      color: inherit;
      text-decoration: none;
      opacity: 0.7;
      transition: opacity 0.3s ease;
    }
    .footer-links a:hover {
      opacity: 1;
    }
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 30px;
      }
      .footer-bottom {
        flex-direction: column;
        text-align: center;
      }
      .footer-links {
        justify-content: center;
      }
      .social-links {
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent implements OnInit {
  isAuthenticated = false;
  isAdmin = false;
  currentDate = new Date();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.isAdmin = user?.role === 'ADMIN';
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
