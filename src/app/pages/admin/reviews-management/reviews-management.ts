import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ReviewService } from '../../../services/review.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog';
import { Review } from '../../../models/review';

@Component({
  selector: 'app-reviews-management',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, SpinnerComponent, ConfirmDialogComponent],
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
            <span class="material-icons">rate_review</span>
            Reviews Management
          </h1>
          <p>Manage customer reviews and feedback</p>
        </div>

        <div class="filters-section">
          <div class="search-box">
            <span class="material-icons">search</span>
            <input type="text" placeholder="Search reviews..." [(ngModel)]="searchTerm" (input)="filterReviews()">
          </div>
          <select class="filter-select" [(ngModel)]="selectedRating" (change)="filterReviews()">
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div class="reviews-grid">
          <div *ngFor="let review of filteredReviews" class="review-card-admin">
            <div class="review-header">
              <div class="review-info">
                <span class="material-icons">person</span>
                User ID: {{ review.userId }}
                <span class="material-icons">inventory</span>
                Product ID: {{ review.productId }}
              </div>
              <div class="review-rating">
                <span class="material-icons star" *ngFor="let star of getStars(review.rating)">star</span>
                <span class="rating-text">{{ review.rating }}/5</span>
              </div>
            </div>
            <div class="review-content">
              <p class="review-comment">{{ review.comment }}</p>
            </div>
            <div class="review-actions">
              <button class="btn-danger" (click)="deleteReview(review.id)">
                <span class="material-icons">delete</span>
                Delete
              </button>
            </div>
          </div>
        </div>

        <app-spinner *ngIf="loading"></app-spinner>
        <app-confirm-dialog [show]="showConfirm" [message]="'Are you sure you want to delete this review?'" (confirmed)="confirmDelete($event)"></app-confirm-dialog>
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

    .reviews-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 20px;
    }

    .review-card-admin {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 20px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .review-card-admin:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }

    .review-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ecf0f1;
    }

    .review-info {
      display: flex;
      align-items: center;
      gap: 15px;
      color: #7f8c8d;
      font-size: 0.9rem;
    }

    .review-rating {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .star {
      color: #f39c12;
      font-size: 1rem;
    }

    .rating-text {
      color: #34495e;
      font-weight: bold;
    }

    .review-content {
      margin-bottom: 15px;
    }

    .review-comment {
      color: #2c3e50;
      line-height: 1.5;
      margin: 0;
    }

    .review-actions {
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

      .reviews-grid {
        grid-template-columns: 1fr;
      }

      .review-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
    }
  `]
})
export class ReviewsManagementComponent implements OnInit {
  reviews: Review[] = [];
  filteredReviews: Review[] = [];
  loading = false;
  showConfirm = false;
  reviewToDelete: number | null = null;
  searchTerm = '';
  selectedRating = '';

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.loading = true;
    this.reviewService.getAllReviews().subscribe(reviews => {
      this.reviews = reviews;
      this.filteredReviews = reviews;
      this.loading = false;
    });
  }

  filterReviews() {
    this.filteredReviews = this.reviews.filter(review => {
      const matchesSearch = review.comment.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           review.productId.toString().includes(this.searchTerm) ||
                           review.userId.toString().includes(this.searchTerm);
      const matchesRating = !this.selectedRating || review.rating.toString() === this.selectedRating;
      return matchesSearch && matchesRating;
    });
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  deleteReview(id: number) {
    this.reviewToDelete = id;
    this.showConfirm = true;
  }

  confirmDelete(confirmed: boolean) {
    if (confirmed && this.reviewToDelete) {
      this.reviewService.deleteReview(this.reviewToDelete);
      this.loadReviews();
    }
    this.showConfirm = false;
    this.reviewToDelete = null;
  }
}
